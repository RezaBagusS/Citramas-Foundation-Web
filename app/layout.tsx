import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainKonten from "./libs/mainKonten";
import Footer from "./components/section/footer";
import PopupImage from "./components/molecules/popupImage";
import HandleRedux from "./libs/handleRedux";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Citramas Foundation",
  description:
    "Citramas Foundation is a non-profit organization that focuses on empowering communities through education, environment, and skills for a sustainable future.",
  generator: "Next.js",
  applicationName: "Citramas Foundation",
  keywords: [
    "Citramas Foundation",
    "Citramas",
    "Foundation",
  ],
  metadataBase: new URL("https://www.citramas-foundation.com/"),
  creator: "Reza Bagus Saputra",
  alternates: {
    canonical: "https://www.citramas-foundation.com/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
  },
  manifest: "/site.webmanifest",
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
          <PopupImage />
          <HandleRedux>
            {children}
          </HandleRedux>
          <Footer />
        </MainKonten>
      </body>
    </html>
  );
}
