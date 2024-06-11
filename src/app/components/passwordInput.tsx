import { FiEyeOff } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { ChangeEvent, useState } from "react";

interface PasswordInputProps {
  setValuesFunction: (
    value: ChangeEvent<HTMLInputElement>,
    inputTitle: string
  ) => void;
}

export default function PasswordInput({
  setValuesFunction,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(true);
  const [inputType, setInputType] = useState("password");

  function handleChangeShowPassword() {
    setShowPassword(!showPassword);
    setInputType((prevInputType) =>
      prevInputType === "password" ? "text" : "password"
    );
  }

  return (
    <div className="flex flex-col mt-5">
      <span>Senha</span>
      <div className="relative"></div>
      <input
        type={inputType}
        className="text-lg w-full h-12 cursor-pointer border border-[#160548] mt-1 p-2 rounded-md"
        placeholder="senha"
        onChange={(value) => setValuesFunction(value, "password")}
      />
      <div
        onClick={() => handleChangeShowPassword()}
        className="absolute right-9 top-1/2 transform translate-y-9 cursor-pointer"
      >
        {showPassword ? (
          <FiEyeOff size={24} color="#2f1b7e" />
        ) : (
          <FaRegEye size={24} color="#2f1b7e" />
        )}
      </div>
    </div>
  );
}
