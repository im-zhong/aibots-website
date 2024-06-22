// get token or throw
export function getToken() {
  const token = localStorage.getItem("token");
  if (token === null) {
    throw new Error("No token");
  }
  return token;
}
