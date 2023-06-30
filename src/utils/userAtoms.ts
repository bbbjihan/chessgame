import { Auth, getAuth } from "firebase/auth";
import { atom } from "recoil";
import { firebase } from "../firebase";

export const UserState = atom<Auth>({
  key: "UserState",
  default : getAuth(firebase)
})

export const logInState = atom<boolean>({
  key: "loginState",
  default: false
})