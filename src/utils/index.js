export function logOut(setToken, setUser, navigate) {
  setToken(null);
  setUser("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
}
