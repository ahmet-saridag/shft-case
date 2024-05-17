import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import TanStackProvider from "@/providers/TanStackProvider";
import { GeneralStoreProvider } from "@/providers/GeneralStoreProvider";
import { useTranslations } from "next-intl";

import { Flowbite, ThemeModeScript } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
  params: any;
}

export const metadata: Metadata = {
  title: "SHFT CASE",
  description: "MADE IT BY AHMET SARIDAG",
};

export default function RootLayout({
  children,
  locale,
  params,
}: RootLayoutProps) {
  const t = useTranslations("Page");

  const header = {
    login: t("Header.login"),
    signIn: t("Header.signIn"),
    turkish: t("Header.turkish"),
    english: t("Header.english"),
    logout: t("Header.logout"),
    jobList: t("Header.jobList"),
    date: t("Header.date"),
    locale: locale,
  };

  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <GeneralStoreProvider>
          <TanStackProvider>
            <div>
              <Header params={params} translateData={header} />
              {children}
              <Footer />
            </div>
          </TanStackProvider>
        </GeneralStoreProvider>
      </body>
    </html>
  );
}
