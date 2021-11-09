import { Auth } from "aws-amplify";

async function useSignUp(username, password, email) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      }
    });
    return user;
  } catch (error) {
    console.log("error signing up:", error);
  }
}
