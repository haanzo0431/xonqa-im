import './globals.css';
import PublicHeader from '@/components/PublicHeader';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata = {
  title: "Xonqa Tuman Maktab Website",
  description: "Official School Website",
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
