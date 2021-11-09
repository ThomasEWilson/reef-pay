import { Auth } from "aws-amplify";

async function useAuth(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.log("error signing in:", error);
  }
}