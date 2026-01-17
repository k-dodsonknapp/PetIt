import { useEffect, useRef } from "react";

function useOnClickOutside(handler) {
    const ref = useRef(null);

    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            handler(e);
        };
        document.addEventListener('mouseover', listener);
        document.addEventListener('mouseleave', listener);

        return () => {
            document.removeEventListener('mouseover', listener);
            document.removeEventListener('mouseleave', listener);
        };
    }, [ref, handler]);

    return ref;
}

export default useOnClickOutside;