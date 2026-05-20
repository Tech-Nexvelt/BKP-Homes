import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import Providers from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/features/CartDrawer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { LiveChat } from '@/components/layout/LiveChat';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BKP HOMES — Premium Handcrafted Furniture',
  description: 'BKP HOMES creates luxury, custom-built hardwood furniture and modular interior curations in Hyderabad, India. Browse sofas, king beds, and dining sets.',
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-dark-bg text-foreground font-sans antialiased overflow-x-hidden',
          inter.variable,
          playfair.variable
        )}
      >
        <Providers>
          <div className="flex flex-col min-h-screen relative">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

          {/* Global Layer overlays */}
          <MobileNav />
          <CartDrawer />
          <WhatsAppButton />
          <LiveChat />
        </Providers>
      </body>
    </html>
  );
}
