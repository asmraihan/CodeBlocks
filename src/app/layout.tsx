
import "@/styles/globals.css"
import type { Metadata } from "next";

import { ThemeProvider } from "@/lib/theme-provider";

import { GeistSans } from "geist/font";
import { Container } from "@/components/shared/container";
import { Toaster } from "sonner";

const title = "CodeBlocks - Manage your code snippets with ease.";
const description =
  "Code Blocks is a UI blocks manager that allows you to create, share, and explore code snippets.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@asmraihan",
  },
  metadataBase: new URL("https://code-blocks.vercel.app/"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      {/* <AuthProvider> */}
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
          {/* div wrapping the footer so that its at bottom of page */}
         
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
      {/* </AuthProvider> */}
    </html>
  );
}