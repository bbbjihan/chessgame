export interface test {
  id: string
}

export interface UserInform {
  userID : string|undefined,
  name : string,
  title : string,
  win : number,
  lose : number,
  draw : number
}
export interface GameInformation {
  gameID : string,
  gameNum: number,
  startTime : string,
  white : UserInform,
  black : UserInform,
  FEN : string,
  state : string,
  notation : string[],
  captured : string[]
}