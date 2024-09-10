import myAxios from "./instanceAxios";

export default function getMap() {
  return myAxios
    .get("/artworks")
    .then((response) => response.data)
    .catch((error) => console.info(error));
}

export function getUserbyId(id) {
  return myAxios
    .get(`/users/${id}`)
    .then((response) => response.data)
    .catch((error) => console.info(error));
}

export function updateUser(id, userData) {
  const formData = new FormData();
  console.info("updateUser-userData", userData);
  Object.keys(userData).forEach((key) => {
    formData.append(key, userData[key]);
  });
  console.info("updateUser-Object", Object.keys(userData));
  return myAxios
    .put(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.info("tata", response.data);
      return response.data;
    })
    .catch((error) => console.info(error));
}
