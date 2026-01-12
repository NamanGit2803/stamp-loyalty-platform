import { Inter } from "next/font/google"
import { Comfortaa } from "next/font/google";
import "./globals.css"
import { StoreProvider } from "../stores/StoreProvider"
import { Toaster } from "@/components/ui/sonner"
import OtpConatiner from "@/components/auth/OtpConatiner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Stampi - Shopkeeper Loyalty Platform",
  description: "Manage customer loyalty, rewards, and payments with ease",
}

export const viewport = {
  themeColor: "#1F2937",
  colorScheme: "light",
  userScalable: true,
}

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${comfortaa.variable} bg-background text-foreground`}>
        <StoreProvider>
          {children}
          <OtpConatiner/>
        </StoreProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
