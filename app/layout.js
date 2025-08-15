import './globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from './ReduxProvider'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mini CRM Dashboard',
  description: 'Redux + TanStack Table Uygulaması',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <h1 className="myTitle">Mini CRM Dashboard</h1>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}


