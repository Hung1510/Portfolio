import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-4 px-4 bg-card relative border-t border-border mt-12 pt-4 flex flex-wrap justify-between items-center">
      {" "}
      <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground/80 font-medium leading-relaxed">
            &copy; {new Date().getFullYear()} <span className="font-bold text-foreground/90">Phạm Trần Gia Hưng</span>
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Made with dedication and passion
          </p>
        </div>
      {/* Back to Top Button */}
        <a
          href="#hero"
          className="group relative p-3.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp
            size={18}
            className="group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </a>
    </footer>
  );
};
