import './globals.css';
import PublicHeader from '@/components/PublicHeader';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata = {
  title: "Xonqa Tuman Maktab Website",
  description: "Official School Website",
  icons: {
    icon: '/logo_0431.webp',
    shortcut: '/logo_0431.webp',
    apple: '/logo_0431.webp',
  },
  verification: {
    google: "T8Rk57O-PcUXfy3RafEmB0EJmyMUIZu-Krmr5yucePg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-emerald-500 selection:text-black">
        <LanguageProvider>
          <PublicHeader />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
