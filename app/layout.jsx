import { Inter } from "next/font/google"
import "./globals.css"
import { StoreProvider } from "../stores/StoreProvider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Loyalty Pro - Shopkeeper Loyalty Platform",
  description: "Manage customer loyalty, rewards, and payments with ease",
}

export const viewport = {
  themeColor: "#1F2937",
  colorScheme: "light",
  userScalable: true,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <StoreProvider>
          {children}
        </StoreProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
