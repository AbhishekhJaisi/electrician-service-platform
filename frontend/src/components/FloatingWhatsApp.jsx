import { MessageCircle } from "lucide-react";
import { useSiteData } from "../PublicSite";

export default function FloatingWhatsApp() {
  const { business: BUSINESS } = useSiteData();

  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:scale-105 transition-transform text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
