import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDQU_3SjwNbGKB8PnK49gH-eoZpG_Y7r2A",
  authDomain: "chessgame-64696.firebaseapp.com",
  projectId: "chessgame-64696",
  storageBucket: "chessgame-64696.appspot.com",
  messagingSenderId: "397020579514",
  appId: "1:397020579514:web:aae670ae99db3ed8ed2483",
  measurementId: "G-BT9J3RSJCM"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
export const authService = getAuth(firebaseApp);



useEffect(() => {
  const gameRef = collection(db, "game");
  const test = async() => {
    await setDoc(doc(gameRef), {
      gameID: "",
      gameNum: 2,
      startTime: "",
      black: {
        userID: "",
        name: "TEST1",
        win: 20,
        lose: 10,
        draw: 5,
        title: "GM",
      },
      white: {
        userID: "",
        name: "TEST2",
        win: 340,
        lose: 20,
        draw: 70,
        title: "GM",
      },
      FEN: "r1b2rk1/1pp1nppp/p7/q1b5/4P3/1NP1BQ2/P2N1PPP/1R3RK1 b - - 7 15",
      state: "progress",
      notation: ["e4","e5","Nf3", "Nc6", "d4", "exd4", "Nxd4", "Qf6","Be3", "Bc5", "c3", "Nge7", "b4", "Bb6", "Bb5", "a6", "Bxc6", "dxc6", "O-O", "c5", "bxc5", "Bxc5", "Nd2", "O-O", "Qf3", "Qb6", "Rab1", "Qa5", "N4b3"],
      captured: ["P","P","B","p","p","n"],
    })
  }
  test()
},[])