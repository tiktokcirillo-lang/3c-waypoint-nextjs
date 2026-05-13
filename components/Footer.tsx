import { useTranslations } from "next-intl";

type NavItem = {
  label: string;
  href: string;
};

export default function Footer() {
  const footer = useTranslations("Footer");
  const navbar = useTranslations("Navbar");
  const navItems = navbar.raw("items") as NavItem[];

  return (
    <footer className="bg-ink px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto]">
        <div>
          <div className="text-lg font-semibold text-ice">3C Waypoint</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-steel">
            {footer("copy")}
          </p>
          <p className="mt-5 text-sm text-steel">
            {footer("partner")}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:text-right">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-steel transition hover:text-ice">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
