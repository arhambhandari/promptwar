import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant py-12 mt-20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-primary mb-4">India Census 2027</h2>
          <p className="text-on-surface-variant max-w-md text-sm leading-relaxed">
            The first fully digital census of India. Ensuring accurate, secure, and comprehensive demographic data collection for national development.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-on-surface mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link href="/enumeration" className="hover:text-primary transition">{t("self_enumeration") || "Self-Enrolment"}</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary transition">Dashboard</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition">Privacy & Security</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-on-surface mb-4">Support</h3>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary transition">Accessibility</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-8 border-t border-outline-variant text-center text-sm text-on-surface-variant">
        <p>&copy; 2027 Ministry of Home Affairs, Government of India. All rights reserved.</p>
      </div>
    </footer>
  );
}
