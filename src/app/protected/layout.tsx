import { signOut, useSession } from "next-auth/react";
import { ReactElement, Suspense } from "react";
import { AiFillHome, AiOutlineUser, AiFillCreditCard, AiOutlineTransaction, AiOutlineInfoCircle } from "react-icons/ai"
import { FiBox } from "react-icons/fi"
import { FaMapLocationDot } from "react-icons/fa6"
import { If } from "react-extras";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import { DashboardLayout } from "../_components/dashboard_layout";

export const metadata = {
    title: "Nitka's Bank | Особистий кабіне",
    description: "Особистий кабінет",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
} as Metadata;

export default function (props: { children: ReactElement[] }) {

    return <>
        <DashboardLayout>
            {props.children}
        </DashboardLayout>
    </>
}