import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/database";
import config from "./config";

const initFireBase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase);
  }
};

initFireBase();

export { firebase };

// const Firebase = firebase.initializeApp(config.firebase);

// export const Providers = {
//   google: new firebase.auth.GoogleAuthProvider(),
// };

// export const auth = firebase.auth();
// export default Firebase;
