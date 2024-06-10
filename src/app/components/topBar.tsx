import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { emailStore } from "@/store/emailStore";
import { tokenStore } from "@/store/tokenStore";

import LoginDialog from "./loginModal";
import RegisterDialog from "./registerModal";

interface TopBarProps {
  page: string;
}

export default function TopBar({ page }: TopBarProps) {
  const router = useRouter();
  const [userAuthenticated, setUserAuthenticated] = useState(Boolean);
  const setEmail = emailStore((state) => state.setEmail);
  const removeEmail = emailStore((state) => state.removeEmail);
  const email = emailStore((state) => state.email);
  const setToken = tokenStore((state) => state.setToken);
  const removeToken = tokenStore((state) => state.removeToken);
  const token = tokenStore((state) => state.token);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("storeToken");
      const storedEmail = localStorage.getItem("storeEmail");

      if (storedToken && storedEmail) {
        setEmail(storedEmail);
        setToken(storedToken);
        setUserAuthenticated(true);
      } else if (email && token) {
        setUserAuthenticated(true);
      }
    }
  }, [email, token]);

  function handleLogout() {
    setUserAuthenticated(false);
    localStorage.removeItem("storeToken");
    localStorage.removeItem("storeEmail");
    removeToken();
    removeEmail();
  }

  function handleRedirect(page: string) {
    router.push(page);
  }

  return (
    <div>
      {page === "home" && userAuthenticated ? (
        <div className="flex gap-2 justify-end p-5">
          <button
            onClick={() => handleRedirect("itemRegister")}
            className="flex px-4 py-2 bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-700"
          >
            Listar Item
          </button>
          <button
            onClick={() => handleLogout()}
            className="flex px-4 py-2 bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      ) : (
        <div className="flex gap-2 justify-end p-5">
          <LoginDialog />
          <RegisterDialog />
        </div>
      )}
    </div>
  );
}
