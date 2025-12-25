import ConfigDropdown from "./config-dropdown";
import ThemeDropdown from "./theme-dropdown";

export default function Footer() {
  return (
    <footer className="">
      <div className="container mx-auto text-center gap-1">
        <ConfigDropdown />
        {" | "}
        <ThemeDropdown />
      </div>
    </footer>
  );
}
