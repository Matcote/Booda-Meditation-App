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
