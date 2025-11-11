import { Link, useLocation } from "react-router-dom";
import { Sprout, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

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
          {user ? (
            <>
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Profile
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/login")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/signup")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;