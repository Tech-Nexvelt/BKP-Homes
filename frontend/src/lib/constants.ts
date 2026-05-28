export const APP_NAME = 'Archana';
export const APP_TAGLINE = 'Interior Design, Redefined';
export const APP_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000';
export const API_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:5000/api/v1';
export const WHATSAPP_NUMBER = process.env['NEXT_PUBLIC_WHATSAPP'] ?? '+919000000000';

export const NAV_LINKS = [
  { label: 'Collections',       href: '/products' },
  { label: 'Custom Design',    href: '/custom-furniture' },
  { label: 'Services',          href: '/interior-services' },
  { label: 'Portfolio',         href: '/portfolio' },
  { label: 'Atelier',           href: '/about' },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us',           href: '/about' },
    { label: 'Manufacturing',      href: '/manufacturing' },
    { label: 'Careers',            href: '/careers' },
    { label: 'Dealer Registration',href: '/dealer-registration' },
    { label: 'Contact',            href: '/contact' },
  ],
  support: [
    { label: 'FAQ',              href: '/faq' },
    { label: 'Support',          href: '/support' },
    { label: 'Shipping Policy',  href: '/shipping-policy' },
    { label: 'Return Policy',    href: '/return-policy' },
    { label: 'Privacy Policy',   href: '/privacy-policy' },
    { label: 'Terms & Conditions',href: '/terms' },
  ],
  collections: [
    { label: 'Living Room', href: '/categories/living-room' },
    { label: 'Bedroom',     href: '/categories/bedroom' },
    { label: 'Dining Room', href: '/categories/dining-room' },
    { label: 'Home Office', href: '/categories/home-office' },
    { label: 'Outdoor',     href: '/categories/outdoor' },
  ],
} as const;

export const ORDER_STAGES = [
  { key: 'CONFIRMED',            label: 'Order Confirmed',        icon: '✅' },
  { key: 'DESIGN_DISCUSSION',   label: 'Design Discussion',       icon: '🎨' },
  { key: 'MATERIAL_SELECTION',  label: 'Material Selection',      icon: '🪵' },
  { key: 'MANUFACTURING_STARTED',label: 'Manufacturing Started',  icon: '🔨' },
  { key: 'IN_PRODUCTION',       label: 'In Production',           icon: '⚙️' },
  { key: 'QUALITY_CHECK',       label: 'Quality Check',           icon: '🔍' },
  { key: 'FINAL_MODIFICATIONS', label: 'Final Modifications',     icon: '✏️' },
  { key: 'PACKAGING',           label: 'Packaging',               icon: '📦' },
  { key: 'READY_FOR_DISPATCH',  label: 'Ready for Dispatch',      icon: '🏭' },
  { key: 'OUT_FOR_DELIVERY',    label: 'Out for Delivery',        icon: '🚚' },
  { key: 'INSTALLATION_SCHEDULED',label:'Installation Scheduled', icon: '📅' },
  { key: 'DELIVERED',           label: 'Delivered',               icon: '🏠' },
] as const;

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'Indian Rupee', rate: 1 },
  { code: 'USD', symbol: '$', label: 'US Dollar',     rate: 0.012 },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham', rate: 0.044 },
] as const;

export const ITEMS_PER_PAGE = 12;
