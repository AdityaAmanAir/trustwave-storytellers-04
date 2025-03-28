
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <span className="text-primary-500 font-bold text-xl">TrustWave</span>
            <span className="text-gray-600 ml-1 font-light">Storytellers</span>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="flex space-x-6 md:order-2">
              <Link to="/" className="text-gray-500 hover:text-primary-500">
                Terms
              </Link>
              <Link to="/" className="text-gray-500 hover:text-primary-500">
                Privacy
              </Link>
              <Link to="/" className="text-gray-500 hover:text-primary-500">
                Help Center
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-5">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TrustWave Storytellers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
