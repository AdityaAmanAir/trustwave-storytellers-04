
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <span className="text-primary-500 dark:text-primary-300 font-bold text-xl glow-text">TrustWave</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1 font-light">Storytellers</span>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="flex space-x-6 md:order-2">
              <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200">
                Terms
              </Link>
              <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200">
                Privacy
              </Link>
              <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200">
                Help Center
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-5">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TrustWave Storytellers. All rights reserved.
          </p>
          <p className="text-center text-sm mt-2 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Made with</span>
            <Heart className="h-4 w-4 mx-1 text-primary-500 dark:text-primary-300 animate-pulse" />
            <span className="text-gray-500 dark:text-gray-400">for authentic storytelling</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
