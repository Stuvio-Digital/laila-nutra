export interface NavLink {
  name: string;
  href: string;
  target?: string;
}

export interface NavItem {
  title: string;
  href?: string;
  links?: NavLink[];
  target?: string;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    links: [
      { name: "Our Story & Purpose", href: "/our-story-purpose" },
      { name: "Quality & Certifications", href: "/quality-certifications" },
      { name: "Sustainability & Responsibility", href: "/sustainability-responsibility" },
    ],
  },
  {
    title: "Health Solutions",
    href: "/health-solutions",
  },
  {
    title: "CRDMO",
    href: "/crdmo"
  },
];
