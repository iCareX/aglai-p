import { atom } from "recoil";

const userTokenState = atom({
  key: "user-token",
  default: JSON.parse(localStorage.getItem("mygen_auth")) || "",
});

export { userTokenState };
