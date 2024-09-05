import myAxios from "./instanceAxios";

export function getMap() {
  return myAxios
    .get("/artworks")
    .then((response) => response.data)
    .catch((error) => console.info(error));
}

export function getGallery(id) {
  return myAxios
    .get(`/artworks/${id}`)
    .then((response) => response.data)
    .catch((error) => console.info(error));
}
