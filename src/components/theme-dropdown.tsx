import { themeAtom } from "@/lib/state";
import { useAtom } from "jotai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect } from "react";

export default function ThemeDropdown() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (theme === "system") {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const systemTheme = prefersDark ? "dark" : "light";

      if (systemTheme === "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      }

      if (systemTheme === "light") {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-orange transition-color duration-200">
        theme
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
