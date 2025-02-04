import ChatWindow from '@/components/ChatWindow';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import AuthenticationProvider from '@/contexts/AuthenticationContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Protector from '@/protect/Protector';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Landing Page',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!process.env.NEXT_PUBLIC_CLIENT_ID) {
    throw new Error('CLIENT_ID environment variable is not defined.');
  }
  return (
    <html lang='en'>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
        <ThemeProvider>
          <AuthenticationProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-white dark:text-black`}
            >
              <Protector />
              <div className='flex flex-col flex-grow w-screen h-screen relative'>
                <NavBar />
                <div className='flex-grow'>{children}</div>
                <Footer />
                <ChatWindow />
                <ScrollToTopButton />
              </div>
            </body>
          </AuthenticationProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
