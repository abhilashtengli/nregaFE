import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <a href="/" className="md:text-xl text-sm font-bold text-gray-900">Nrega Files</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/signin">
              <Button variant="ghost" className="cursor-pointer">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
