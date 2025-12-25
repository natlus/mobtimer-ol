import ConfigDropdown from "./config-dropdown";
import ThemeDropdown from "./theme-dropdown";

export default function Footer() {
  return (
    <footer className="">
      <div className="container mx-auto text-center gap-1">
        <ConfigDropdown />
        {" | "}
        <ThemeDropdown />
        {" | "}
        <a
          href="https://github.com/natlus/mobtimer-ol"
          className="hover:text-orange transition-color duration-200"
        >
          github
        </a>
      </div>
    </footer>
  );
}
