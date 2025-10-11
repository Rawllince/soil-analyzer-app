import { Sprout } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-muted/30 py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">SoilCheck</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Empowering farmers with data-driven soil insights for sustainable agriculture
          </p>
          
          <p className="text-sm text-muted-foreground">
            © 2025 SoilCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
