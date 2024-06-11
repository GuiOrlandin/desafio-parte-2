import React, { ChangeEvent, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAuthenticateMutate } from "@/hooks/userAuthenticateHook";
import {
  UserRegisterDetails,
  useUserRegisterMutate,
} from "@/hooks/userRegisterHook";
import { emailStore } from "@/store/emailStore";
import { tokenStore } from "@/store/tokenStore";
import { errorStore } from "@/store/errorStore";
import PasswordInput from "./passwordInput";

export default function RegisterDialog() {
  const [userRegisterDetails, setUserRegisterDetails] =
    useState<UserRegisterDetails>();
  const {
    mutate: authenticatateUserMutate,
    data: access_token,
    isSuccess,
    status,
  } = useAuthenticateMutate();
  const {
    mutate,
    isSuccess: userRegistered,
    status: registerStatus,
    data,
  } = useUserRegisterMutate();
  const setEmail = emailStore((state) => state.setEmail);
  const setToken = tokenStore((state) => state.setToken);
  const removeError = errorStore((state) => state.removeError);
  const setError = errorStore((state) => state.setError);
  const error = errorStore((state) => state.error);
  const [open, setOpen] = useState(false);

  function handleSetRegisterDetails(
    event: ChangeEvent<HTMLInputElement>,
    inputTitle: string
  ) {
    const { value } = event.target;
    setUserRegisterDetails((prevDetails) => ({
      ...prevDetails!,
      [inputTitle]: value,
    }));
  }

  function handleRegister(registerDetails: UserRegisterDetails) {
    mutate(registerDetails);
  }

  useEffect(() => {
    if (userRegistered && data === undefined) {
      return setError("Email ja em uso!");
    }

    if (userRegistered && data !== undefined) {
      authenticatateUserMutate({
        email: userRegisterDetails!.email,
        password: userRegisterDetails!.password,
      });
      removeError();
    }
  }, [userRegistered, data]);

  useEffect(() => {
    if (isSuccess) {
      if (typeof window !== "undefined") {
        localStorage.setItem("storeToken", access_token);
        localStorage.setItem("storeEmail", userRegisterDetails!.email);
        setEmail(userRegisterDetails!.email);
        setToken(access_token);
        setError("");
      }
      setOpen(false);
    } else if (status === "error") {
      setError("Email ja em uso!");
    }
  }, [isSuccess, status]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-700"
        >
          Cadastrar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-auto w-full max-w-[350px] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title>Registrar</Dialog.Title>
          <div className="flex flex-col mt-5">
            <span>Email</span>
            <input
              type="text"
              className="text-lg w-full h-12 cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
              placeholder="email"
              onChange={(value) => handleSetRegisterDetails(value, "email")}
            />
          </div>
          <PasswordInput setValuesFunction={handleSetRegisterDetails} />
          <div className="text-red-600 mt-1">{error}</div>
          <div className="flex justify-end">
            <button
              className="flex items-center mt-6 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-700"
              onClick={() => handleRegister(userRegisterDetails!)}
            >
              Cadastrar
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
