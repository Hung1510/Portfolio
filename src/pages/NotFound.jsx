import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { lang } from "@/helper/lang";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
      <h1 className="text-7xl md:text-9xl font-bold text-primary mb-4">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        {lang({ vi: "Không tìm thấy trang", en: "Page Not Found" })}
      </h2>

      <p className="text-muted-foreground max-w-md mb-8">
        {lang({
          vi: "Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.",
          en: "The page you're looking for doesn't exist or may have been moved.",
        })}
      </p>

      <Link to="/" className="cosmic-button flex items-center gap-2">
        <ArrowLeft size={16} />
        {lang({ vi: "Về trang chủ", en: "Back to Home" })}
      </Link>
    </div>
  );
};