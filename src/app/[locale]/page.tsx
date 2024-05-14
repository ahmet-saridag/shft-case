import Image from "next/image";
import VercelLogo from "@/public/vercel.svg";
import NextLogo from "@/public/next.svg";
import { useTranslations } from "next-intl";
import  Banner  from "@/components/banner";

export default function Home() {
  const t = useTranslations("Home");

  return <>
  <Banner></Banner>
  </>;
}
