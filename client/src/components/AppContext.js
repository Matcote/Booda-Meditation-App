// import React from "react";
// import withFirebaseAuth from "react-with-firebase-auth";
// import * as firebase from "firebase";
// import "firebase/auth";

// var firebaseConfig = {
//   apiKey: "AIzaSyCJYMR6lwGDXSHgy5Het9QiWbQLXVtJAV4",
//   authDomain: "meditation-app-e93af.firebaseapp.com",
//   databaseURL: "https://meditation-app-e93af.firebaseio.com",
//   projectId: "meditation-app-e93af",
//   storageBucket: "meditation-app-e93af.appspot.com",
//   messagingSenderId: "91373894520",
//   appId: "1:91373894520:web:975908a212d1effd23268d",
//   measurementId: "G-87JMCVHJK4",
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseAppAuth = firebaseApp.auth();

// export const AppContext = React.createContext();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// const AppProvider = ({ children, signInWithGoogle, user }) => {
//   const [appUser, setAppUser] = React.useState({});

//   React.useEffect(() => {
//     if (user) {
//       setAppUser({
//         displayName: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL,
//       });
//     }
//   }, [user]);

//   return (
//     <AppContext.Provider value={{ appUser, signInWithGoogle }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default withFirebaseAuth({ providers, firebaseAppAuth })(AppProvider);
