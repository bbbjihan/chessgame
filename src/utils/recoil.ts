import { atom } from "recoil";
import { GameInformation } from "./interfaces";

//기본 시작 포지션"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
//스테일메이트 테스트용 포지션 "8/8/8/8/8/5K2/Q7/5k2"
//캐슬링 테스트용 포지션 "r3k2r/8/8/8/8/8/8/R3K2R"

export const lobbyGamesState = atom<GameInformation[]|undefined>({
  key: "lobbyGamesState",
  default: []
})

export const gameNumState = atom<number>({
  key: "gamaNumState",
  default: 0
})