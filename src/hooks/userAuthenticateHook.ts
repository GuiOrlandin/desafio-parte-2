import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface UserAuthenticationDetails {
  email: string;
  password: string;
}

async function postData(data: UserAuthenticationDetails) {
  try {
    const response = await axios.post("http://localhost:3333/login", data);
    const token = await response.data.access_token;
    return token;
  } catch (error) {
    throw new Error("Falha ao autenticar usuário");
  }
}

export function useAuthenticateMutate() {
  const mutate = useMutation({
    mutationFn: postData,
  });

  return mutate;
}
