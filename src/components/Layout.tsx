
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="absolute top-4 right-4 z-50 md:hidden">
          <ThemeToggle />
        </div>
        <Navbar />
        <main className="flex-grow relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-300/20 dark:bg-primary-500/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary-200/20 dark:bg-primary-400/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light delay-700"></div>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
