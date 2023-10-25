import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider, getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { NextAuthProvider } from "./_components/session";
import { Metadata } from "next";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Nitka's Bank",
    description: "Банк вашої мрії",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
} as Metadata;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="night">
            <body className={`font-sans ${inter.variable}`}>
                <NextAuthProvider>
                    <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
