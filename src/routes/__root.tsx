import "@/index.css";
import { Sidebar } from "@/components/sidebar";
import { mobsAtom, recentParticipantsAtom, themeAtom } from "@/lib/state";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SunMoon, Wrench } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { HeadContent } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [
      {
        title: "mobtimer",
      },
    ],
  }),
});

function RootLayout() {
  const [, setMobs] = useAtom(mobsAtom);
  const [, setRecentParticipants] = useAtom(recentParticipantsAtom);
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
    <>
      <HeadContent />
      <div className="grid grid-rows-[56px_1fr] h-full gap-2 p-2">
        <header className="flex flex-row gap-6 px-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none hover:scale-[1.2] transition-transform duration-300">
              <Wrench />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setMobs([])}>
                Clear all mobs
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRecentParticipants([])}>
                Clear recent participants
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ml-auto hover:scale-[1.2] transition-transform duration-300">
              <SunMoon />
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
        </header>
        <div className="grid md:grid-cols-[1fr_500px_1fr] grid-cols-[1fr_2fr] max-w-full gap-2 h-max self-start pt-16">
          <Sidebar />
          <div className="relative flex justify-center items-start">
            <Outlet />
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
}
