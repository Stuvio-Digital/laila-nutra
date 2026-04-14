export const NAV_LINK_CLASS =
  'text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]';

export const LINKS_HEADING_CLASS =
  'text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 mb-4 lg:mb-6 font-medium text-black leading-[124%] tracking-[-2%]';

interface NavLink {
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  links: NavLink[];
  colClass: string;
}

const companyLinks: NavLink[] = [
  { label: 'Products', href: '/products' },
  { label: 'Research & Innovation', href: '/research-innovations' },
  { label: 'CDMO', href: '/cdmo' },
  { label: 'Health Solutions', href: '/health-solutions' },
];

const aboutLinks: NavLink[] = [
  { label: 'Our Story & Purpose', href: '/our-story-purpose' },
  { label: 'Quality, Certifications & Awards', href: '/quality-certifications' },
  { label: 'Sustainability & Responsibility', href: '/sustainability-responsibility' },
];

const insightsLinks: NavLink[] = [
  { label: 'Blog / Wellness Articles', href: '#' },
  { label: 'How-to Guides', href: '#' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const navSections: NavSection[] = [
  {
    title: 'Company Overview',
    links: companyLinks,
    colClass: 'col-span-4 sm:col-span-6 md:col-span-4 lg:col-start-1 @6xl:col-start-4 @6xl:col-span-3',
  },
  {
    title: 'About Us',
    links: aboutLinks,
    colClass: 'col-span-4 sm:col-span-6 md:col-span-4 @6xl:col-span-3',
  },
  {
    title: 'Insights & Contact',
    links: insightsLinks,
    colClass: 'col-span-4 sm:col-span-6 md:col-span-4 @6xl:col-span-3',
  },
];