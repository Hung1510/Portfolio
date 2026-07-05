import { Github, Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { lang } from "../helper/lang";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mkgvlzey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: lang({ vi: "Gửi thành công!", en: "Message Sent!" }),
          description: lang({
            vi: "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm.",
            en: "Thank you for reaching out. I’ll get back to you soon.",
          }),
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({
          title: lang({ vi: "Lỗi", en: "Error" }),
          description:
            data.error ||
            lang({
              vi: "Có lỗi xảy ra. Vui lòng thử lại.",
              en: "Something went wrong. Please try again.",
            }),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: lang({ vi: "Lỗi", en: "Error" }),
        description: lang({
          vi: "Không thể gửi tin nhắn. Vui lòng thử lại sau.",
          en: "Failed to send message. Please try again later.",
        }),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <p className="font-mono text-xs md:text-sm text-primary tracking-[0.25em] mb-3 text-center">
          {lang({ en: "06 / CONTACT", vi: "06 / LIÊN HỆ" })}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {lang({ vi: "Liên hệ", en: "Get In" })}{" "}
          <span className="text-primary">
            {lang({ vi: "Tôi", en: "Touch" })}
          </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {lang({
            vi: "Tôi vẫn đang trên hành trình trở thành kỹ sư phần mềm, luôn sẵn sàng học hỏi, khám phá và thử thách bản thân. Nếu bạn có ý tưởng dự án hoặc muốn hợp tác, đừng ngần ngại liên hệ.",
            en: "I'm still early in my journey as a software engineer, but I'm eager to learn, explore, and take on new challenges. If you have a project in mind or want to collaborate, feel free to reach out.",
          })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              {lang({ vi: "Thông tin liên hệ", en: "Contact Information" })}
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {lang({ vi: "Email", en: "Email" })}
                  </h4>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=giahung1510200519@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    giahung1510200519@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {lang({ vi: "Điện thoại", en: "Phone" })}
                  </h4>
                  <a
                    href="tel:+84909029792"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (+84) 0909029792
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {lang({ vi: "Địa điểm", en: "Location" })}
                  </h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    {lang({
                      vi: "TP. Hồ Chí Minh, Việt Nam",
                      en: "Ho Chi Minh City, Vietnam",
                    })}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4">
                {lang({ vi: "Kết nối với tôi", en: "Connect With Me" })}
              </h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://github.com/Hung1510"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <Github />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">
              {lang({ vi: "Gửi tin nhắn", en: "Send a Message" })}
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang({ vi: "Tên của bạn", en: "Your Name" })}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder={lang({ vi: "Nhập tên", en: "Your name" })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang({ vi: "Email của bạn", en: "Your Email" })}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder={lang({ vi: "Anhli@gmail.com", en: "jimy@gmail.com" })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang({ vi: "Nội dung", en: "Your Message" })}
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  placeholder={lang({
                    vi: "Nhập nội dung...",
                    en: "Type your message...",
                  })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cosmic-button w-full flex items-center justify-center gap-2"
              >
                {isSubmitting
                  ? lang({ vi: "Đang gửi...", en: "Sending..." })
                  : lang({ vi: "Gửi tin nhắn", en: "Send Message" })}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};