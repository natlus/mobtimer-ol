import "@/index.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { HeadContent } from "@tanstack/react-router";
import Footer from "@/components/footer";
import Header from "@/components/header";

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
  return (
    <>
      <HeadContent />

      <div className="grid grid-rows-[56px_1fr] h-full gap-2 p-2">
        <Header />
        <div className="flex mx-auto max-w-full gap-2 h-max self-start pt-16">
          <div className="relative flex justify-center items-start">
            <Outlet />
          </div>
        </div>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </>
  );
}
