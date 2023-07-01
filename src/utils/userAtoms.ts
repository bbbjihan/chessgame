import { Auth, getAuth } from "firebase/auth";
import { atom } from "recoil";
import { firebaseApp } from "../firebase";

export const UserState = atom<Auth>({
  key: "UserState",
  default : getAuth(firebaseApp)
})

export const logInState = atom<boolean>({
  key: "loginState",
  default: false
})