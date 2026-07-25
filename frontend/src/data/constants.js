import {
  ShieldCheck,
  Clock,
  Wrench,
  BadgeCheck,
  Home as HomeIcon,
  AlertTriangle,
  Zap,
  Fan,
  Lightbulb,
  Plug,
  Power,
  Wind,
  Flame,
} from "lucide-react";

export const BUSINESS = {
  name: "Sagar Electricals",
  owner: "Sagar Sharma",
  tagline: "Licensed electrician. Doorstep service across the tricity.",
  phone: "+91 7086173493",
  whatsapp: "7086173493",
  email: "abhishekhwayne@gmail.com",
  address: "No. 4 Makum Pathar, Margherita, Tinsukia, Assam, India - 786187",
  addressAs: "মাকুম পাথাৰ নং ৪, মাৰ্ঘেৰিটা, তিনিচুকীয়া জিলা, অসম, ভাৰত - ৭৮৬১৮৭",
  shortLocation: "Margherita, Assam",
  hours: "Mon–Sat, 8:00 AM – 9:00 PM · Emergency line 24/7",
  years: 2,
  map: "https://www.google.com/maps?q=Margherita,Assam&z=14&output=embed",
  licenseFile: "",
  ownerPhoto: "",
};

export const WHY_US = [
  { icon: ShieldCheck, label: "Licensed & Insured", labelAs: "অনুজ্ঞাপ্ৰাপ্ত আৰু বীমাকৃত", sub: "Every job covered, every time" },
  { icon: Clock, label: "Same-Day Response", labelAs: "একেদিনাই সঁহাৰি", sub: "Most calls answered within the hour" },
  { icon: Wrench, label: "Own Equipment", labelAs: "নিজা সঁজুলি", sub: "No waiting on borrowed tools" },
  { icon: BadgeCheck, label: "1+ Years Experience", labelAs: "১+ বছৰৰ অভিজ্ঞতা", sub: "Homes, offices, emergencies" },
  { icon: HomeIcon, label: "Doorstep Service", labelAs: "দুৱাৰ মুখৰ সেৱা", sub: "We come to you, city-wide" },
  { icon: AlertTriangle, label: "Emergency Repairs", labelAs: "জৰুৰীকালীন মেৰামতি", sub: "Short circuits, outages, sparking" },
];

export const SERVICES = [
  { icon: Zap, name: "House Wiring", nameAs: "ঘৰৰ ৱায়াৰিং", desc: "Full or partial home rewiring, code-compliant.", price: "₹2,500", time: "1–2 days" },
  { icon: Fan, name: "Fan Installation", nameAs: "ফেন ইনষ্টলেচন", desc: "Ceiling, wall & exhaust fan fitting.", price: "₹300", time: "30 min" },
  { icon: Lightbulb, name: "Light Installation", nameAs: "বাতি ইনষ্টলেচন", desc: "LED panels, chandeliers, outdoor lighting.", price: "₹250", time: "30 min" },
  { icon: Plug, name: "Switch Board Repair", nameAs: "ছুইচ বৰ্ড মেৰামতি", desc: "Faulty boards, loose switches, sparking fixed.", price: "₹200", time: "20 min" },
  { icon: Power, name: "MCB Installation", nameAs: "MCB ইনষ্টলেচন", desc: "Circuit breaker fitting & upgrades.", price: "₹800", time: "1 hour" },
  { icon: AlertTriangle, name: "Short Circuit Repair", nameAs: "শ্বৰ্ট চাৰ্কিট মেৰামতি", desc: "Fast diagnosis, safe permanent fix.", price: "₹500", time: "45 min" },
  { icon: Zap, name: "Inverter Installation", nameAs: "ইনভাৰ্টাৰ ইনষ্টলেচন", desc: "Setup, wiring & battery connection.", price: "₹1,200", time: "1–2 hours" },
  { icon: Wind, name: "AC Power Point", nameAs: "AC পাৱাৰ পইণ্ট", desc: "Dedicated points for split & window AC.", price: "₹900", time: "1 hour" },
  { icon: Flame, name: "Geyser Installation", nameAs: "গিজাৰ ইনষ্টলেচন", desc: "Safe fitting with dedicated MCB.", price: "₹600", time: "1 hour" },
];

export const GALLERY = [
  { tag: "Wiring", h: 260 },
  { tag: "Panels", h: 340 },
  { tag: "Lighting", h: 220 },
  { tag: "Repairs", h: 300 },
  { tag: "Office", h: 240 },
  { tag: "Wiring", h: 320 },
];

// export const REVIEWS = [
//   { name: "Priya Malhotra", area: "Sector 34, Chandigarh", rating: 5, text: "Fixed a short circuit at 10pm the same night I called. Genuinely reliable.", date: "2 weeks ago" },
//   { name: "Harpreet Sidhu", area: "Kharar", rating: 5, text: "Rewired our whole ground floor. Neat work, fair price, no surprises.", date: "1 month ago" },
//   { name: "Anil Kapoor", area: "Zirakpur", rating: 4, text: "Prompt and polite. Slightly later than quoted but the work was solid.", date: "1 month ago" },
// ];
export const REVIEWS = [];

export const AREAS = ["Chandigarh", "Mohali", "Panchkula", "Kharar", "Zirakpur"];
