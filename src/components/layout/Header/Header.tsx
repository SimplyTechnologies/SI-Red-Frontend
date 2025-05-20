import HeaderLeft from "./HeaderLeft";
import HeaderUserMenu from "./HeaderUserMenu";

export default function Header() {
  return (
    <header
      className="h-16 px-4 md:px-6 flex items-center justify-between border-b"
      style={{ backgroundColor: "#E4E4E4" }}
    >
      <HeaderLeft />
      <HeaderUserMenu />
    </header>
  );
}
