import type { Metadata } from "next";
import { FloatingFeedbackProvider } from "./components/feedback/FloatingFeedbackProvider";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "LastRound",
  description: "Every night has a LastRound.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <FloatingFeedbackProvider>{children}</FloatingFeedbackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
