import cuate from "../../assets/404 Error with a cute animal-cuate.svg";
import pana from "../../assets/404 Error with a cute animal-pana.svg";
import rafiki from "../../assets/404 Error with a cute animal-rafiki.svg";
import portals from "../../assets/404 error with portals-cuate.svg";

export default function serveImageError() {
  const images = [cuate, pana, rafiki, portals];
  return images[Math.floor(Math.random() * images.length)];
}