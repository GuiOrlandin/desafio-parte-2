import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { emailStore } from "@/store/emailStore";
import { tokenStore } from "@/store/tokenStore";

import LoginDialog from "./loginModal";
import RegisterDialog from "./registerModal";
import LogoutModal from "./logoutModal";
import { userStore } from "@/store/userStore";
import { errorStore } from "@/store/errorStore";

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
  const removeUser = userStore((state) => state.removeUser);
  const removeError = errorStore((state) => state.removeError);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageToken = localStorage.getItem("storeToken");
      const storageEmail = localStorage.getItem("storeEmail");

      if (storageToken && storageEmail) {
        setEmail(storageEmail);
        setToken(storageToken);
        setUserAuthenticated(true);
        removeError();
      } else if (email && token) {
        setUserAuthenticated(true);
        removeError();
      }

      if (!email && !token && !storageToken && !storageEmail) {
        router.push("/");
      }
    }
  }, [email, token]);

  function handleLogout() {
    setUserAuthenticated(false);
    localStorage.removeItem("storeToken");
    localStorage.removeItem("storeEmail");
    removeToken();
    removeEmail();
    removeUser();
    window.location.reload();
  }

  function handleRedirect(page: string) {
    router.push(page);
  }

  return (
    <div>
      {page === "home" ? (
        <div className="flex gap-2 justify-end p-5">
          {userAuthenticated ? (
            <>
              <button
                onClick={() => handleRedirect("itemRegister")}
                className="flex px-4 py-2 bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-700"
              >
                Listar Item
              </button>
              <LogoutModal
                title="Sair da conta"
                content="Você deseja sair da sua conta?"
                functionAction={handleLogout}
              />
            </>
          ) : (
            <>
              <div className="flex gap-2 justify-end">
                <LoginDialog />
                <RegisterDialog />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-1 p-5">
          <button
            onClick={() => handleRedirect("/")}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-700"
          >
            Home
          </button>
          <div className="flex-grow"></div>
          <LogoutModal
            title="Sair da conta"
            content="Você deseja sair da sua conta?"
            functionAction={handleLogout}
          />
        </div>
      )}
    </div>
  );
}
