import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface UserRegisterDetails {
  email: string;
  password: string;
}

async function postData(data: UserRegisterDetails) {
  try {
    const response = await axios.post("http://localhost:3333/users", data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export function useUserRegisterMutate() {
  const mutate = useMutation({
    mutationFn: (data: UserRegisterDetails) => postData(data),
  });
  return mutate;
}
