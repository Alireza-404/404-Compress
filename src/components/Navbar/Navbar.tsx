import Logo from "../Logo/Logo";
import Status from "../Status/Status";

export default function Navbar() {
  return (
    <header>
      <div className="px-4 xl:px-25 2xl:px-55">
        <nav
          className="h-20 lg:h-24 border-b border-secondary/20 flex items-center 
            justify-between"
        >
          <Logo />

          <Status />
        </nav>
      </div>
    </header>
  );
}
