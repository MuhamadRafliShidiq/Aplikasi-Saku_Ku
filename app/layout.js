import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Saku-Ku",
  description: "Kelola Keuangan, Kendalikan Masa Depan!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}>
          {/* header */}
          <Header />
          <main className="mt-5 min-h-screen">{children}</main>
          {/* footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>&copy; 2025 Muhamad Rafli Shidiq. All Rights Reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>

  );
}
