import LoginDialog from "./loginModal";
import RegisterDialog from "./registerModal";

interface TopBarProps {
  page: string;
}

export default function TopBar({ page }: TopBarProps) {
  return (
    <div>
      {page === "home" && (
        <div className="flex gap-2 justify-end p-5">
          <LoginDialog />
          <RegisterDialog />
        </div>
      )}
    </div>
  );
}
