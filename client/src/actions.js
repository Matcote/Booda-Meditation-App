export const startLogIn = () => ({
  type: "START_LOG_IN",
});
export const logIn = (user) => ({
  type: "LOG_IN",
  user,
});
export const logInError = () => ({
  type: "LOG_IN_ERROR",
});

//
// export const startSignUp = () => ({
//   type: "START_SIGN_UP",
// });
// export const signUp = (user) => ({
//   type: "SIGN_UP",
//   user,
// });
// export const signUpError = () => ({
//   type: "SIGN_UP_ERROR",
// });
