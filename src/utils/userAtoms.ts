import { atom } from "recoil";
import { UserInform, UserInformDefault } from "./interfaces";

export const logInState = atom<boolean>({
  key: "loginState",
  default: false
})

export const whitePlayerState = atom<UserInform>({
  key: "whitePlayerState",
  default: UserInformDefault
})

export const blackPlayerState = atom<UserInform>({
  key: "blackPlayerState",
  default: UserInformDefault
})