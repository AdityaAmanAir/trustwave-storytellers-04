
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-primary-100/20 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 transition-colors duration-500">
        <div className="fixed top-4 left-4 z-50 md:top-6 md:left-6">
          <ThemeToggle />
        </div>
        <Navbar />
        <main className="flex-grow relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-300/20 dark:bg-primary-500/10 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary-200/30 dark:bg-primary-600/10 rounded-full filter blur-3xl opacity-60 animate-float"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary-200/20 dark:bg-primary-400/10 rounded-full filter blur-3xl opacity-70 animate-pulse-light delay-700"></div>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
