import "@/index.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "JSMQ | WEBSITE DEVELOPMENT SERVICES",
  description: "JSMQ | WEBSITE DEVELOPMENT SERVICES",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0f0d]" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

