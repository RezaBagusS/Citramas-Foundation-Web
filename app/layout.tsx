import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainKonten from "./libs/mainKonten";
import Footer from "./components/section/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} max-w-[1400px] mx-auto`}>
          <MainKonten>
            {children}
            <Footer />
          </MainKonten>
      </body>
    </html>
  );
}
