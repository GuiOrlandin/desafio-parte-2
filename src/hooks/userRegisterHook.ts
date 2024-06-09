import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { tokenStore } from "../store/tokenStore";

export interface UserRegisterDetails {
  email: string;
  password: string;
}

async function postData(data: UserRegisterDetails, authToken: string) {
  try {
    if (authToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios.post("http://localhost:3333/users", data, config);
      console.log("User created!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export function useUserRegisterMutate() {
  const setToken = tokenStore((state) => state.setToken);
  const authToken = tokenStore((state) => state.token);

  if (typeof window !== "undefined") {
    const storeToken = localStorage.getItem("storeToken");
    if (storeToken) {
      setToken(storeToken);
    }
  }

  const mutate = useMutation({
    mutationFn: (data: UserRegisterDetails) => postData(data, authToken),
  });
  return mutate;
}
