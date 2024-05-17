import { http } from "@/services/http";
import { useGeneralStore } from "@/providers/GeneralStoreProvider";
import LoginComponent from "@/components/login";
import { useTranslations } from "next-intl";

export default function Login({ params }: any) {
  const t = useTranslations("Page");

  const loginData = {
    email: t("Login.email"),
    createAccount: t("Login.createAccount"),
    signTitle: t("Login.signTitle"),
    password: t("Login.password"),
    rememberMe: t("Login.rememberMe"),
    forgotPassword: t("Login.forgotPassword"),
    login: t("Login.login"),
    signUp: t("Login.signUp"),
    alreadyAccount: t("Login.alreadyAccount"),
    accountYet: t("Login.accountYet"),
    loginHere: t("Login.loginHere"),
  };

  return <LoginComponent params={params} translateData={loginData} />;
}
