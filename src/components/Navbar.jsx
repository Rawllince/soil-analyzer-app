import { Link, useLocation } from "react-router-dom";
import { Sprout } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <Sprout className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">SoilCheck</span>
        </Link>

        <div className="flex items-center space-x-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Assessment
          </Link>
          <Link
            to="/about"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/about")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/contact")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;