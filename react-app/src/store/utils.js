export function getCookie(name) {
    const part = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="));

    if (!part) return null;

    const value = part.slice(name.length + 1); // everything after "name="
    return decodeURIComponent(value);
}

let refreshPromise = null;

async function refreshCsrfToken() {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const res = await fetch("http://localhost:5000/api/auth/r", {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                const data = await safeJson(res);
                const err = new Error("CSRF refresh failed");
                err.status = res.status;
                err.data = data;
                throw err;
            }

            // IMPORTANT: return something so callers can await a resolved value
            return true;
        })().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}

async function safeJson(res) {
    const text = await res.text();
    try {
        return text ? JSON.parse(text) : null;
    } catch {
        return { raw: text };
    }
}

function isCsrfProblem(res, data) {
    if (!res || !data) return false;

    // Pull messages from either {errors:[...]} or {raw:"..."} safely
    const msgs = [];

    if (Array.isArray(data.errors)) msgs.push(...data.errors);
    if (typeof data.raw === "string") msgs.push(data.raw);

    const blob = msgs.join(" ").toLowerCase();

    // Match any CSRF failure, not just expired
    const looksLikeCsrf = blob.includes("csrf");
    const looksLikeTokenIssue =
        blob.includes("expired") ||
        blob.includes("invalid") ||
        blob.includes("mismatch") ||
        blob.includes("missing");

    // Your backend uses 400 for CSRF issues (from earlier chat)
    return res.status === 400 && looksLikeCsrf && looksLikeTokenIssue;
}

export async function csrfFetch(url, options = {}) {
    const base = {
        method: options.method || "GET",
        headers: options.headers ? { ...options.headers } : {},
        body: options.body,
        credentials: "include",
    }

    if (
        base.body &&
        typeof base.body === "object" &&
        !(base.body instanceof FormData) &&
        !(base.body instanceof Blob)
    ) {
        base.headers["Content-Type"] = base.headers["Content-Type"] || "application/json";
        base.body = JSON.stringify(base.body);
    }

    const attempt = async () => {
        const headers = { ...base.headers };

        const method = (base.method || "GET").toUpperCase();
        if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
            const token = getCookie("csrf_token");
            if (token) headers["X-CSRFToken"] = token;
        }

        const res = await fetch(url, { ...base, headers });

        const data = await safeJson(res);

        if (res.ok) {
            return data;
        }

        const err = new Error("Request failed");
        err.status = res.status;
        err.data = data;
        err.res = res;
        throw err;
    };

    try {
        return await attempt();
    } catch (err) {
        const res = err.res;
        const data = err.data;

        if (res && isCsrfProblem(res, data)) {
            await refreshCsrfToken();
            return await attempt();
        }

        throw err;
    }
}