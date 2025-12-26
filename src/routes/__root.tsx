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

      <div className="grid h-full grid-rows-[56px_1fr] gap-2 p-2">
        <Header />
        <div className="mx-auto flex h-max max-w-full gap-2 self-start pt-16">
          <div className="relative flex items-start justify-center">
            <Outlet />
          </div>
        </div>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </>
  );
}
