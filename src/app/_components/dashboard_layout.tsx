"use client"

import { signOut, useSession } from "next-auth/react";
import { ReactElement, Suspense, useEffect } from "react";
import { AiFillHome, AiOutlineUser, AiFillCreditCard, AiOutlineTransaction, AiOutlineInfoCircle } from "react-icons/ai"
import { FiAlertCircle, FiBox } from "react-icons/fi"
import { FaMapLocationDot } from "react-icons/fa6"
import { RiFilePaper2Fill } from "react-icons/ri"
import { BsFillPiggyBankFill } from "react-icons/bs"
import { If } from "react-extras";
import { usePathname, useRouter } from "next/navigation";
import { Metadata } from "next";
import { useRouteInfo } from "../_stores/route_info";
import Link from "next/link";
import { Alerts } from "./alerts";
import { SearchUser } from "./search_user";


export function DashboardLayout(props: { children: ReactElement[] }) {
    const {data: sessionData} = useSession({ required: true })
    const pathname = usePathname()

    return <>

        <div className="flex flex-row bg-base-100">
            <nav className="drawer drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pr-4">
                    <TopNavBar />
                    {/* <div className="space-y-4">
                        <Alerts />
                        {props.children}
                    </div> */}
                    <div className="toast toast-bottom toast-end">
                        <Alerts hide />
                    </div>
                    <div className="px-2">
                        {props.children}
                    </div>

                </div>
                <div className="drawer-side">
                    <div className="bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex shadow-sm">
                        <Link href="/" className="btn btn-ghost px-4">
                            ІБанк
                        </Link>
                    </div>
                    <aside className="w-80">
                        <ul className="menu menu-md px-4 py-0">
                            <li></li>
                            <li className="menu-title flex flex-row gap-4 items-center">
                                <AiFillHome className="text-secondary" size={24} />
                                Головна
                            </li>
                            <li className="">
                                <Link className={pathname == "/protected" ? "active" : ""} href="/protected">
                                    Кабінет
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-md px-4 py-0">
                            <li></li>
                            <li className="menu-title flex flex-row gap-4 items-center">
                                <BsFillPiggyBankFill className="text-secondary" size={24} />
                                Рахунок
                            </li>
                            <li className="">
                                <Link className={pathname == "/protected/cards" ? "active" : ""} href="/protected/cards">
                                    Картки
                                </Link>
                            </li>
                            <li className="">
                                <Link className={pathname == "/protected/transactions" ? "active" : ""} href="/protected/transactions">
                                    Транзакції
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-md px-4 py-0">
                            <li></li>
                            <li className="menu-title flex flex-row gap-4 items-center">
                                <FiAlertCircle className="text-secondary" size={24} />
                                Інформація
                            </li>
                            <li className="">
                                <Link className={pathname == "/protected/info/points" ? "active" : ""} href="/protected/info/points">
                                    Філіали
                                </Link>
                            </li>
                            <li className="">
                                <Link className={pathname == "/protected/info/terms" ? "active" : ""} href="/protected/info/terms">
                                    Умови користування
                                </Link>
                            </li>
                        </ul>
                        { sessionData?.user.role == "ADMIN" || sessionData?.user.role == "OPERATOR" && <>
                            <OperatorMenu />
                        </>}
                    </aside>
                </div>
            </nav>
        </div>
    </>
}

function TopNavBar() {
    const { data: sessionData } = useSession()
    return <div className="sticky top-0 z-30 flex h-16 w-full bg-opacity-90 backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)] shadow-sm">
        <nav className="navbar bg-base-100 ">
            <div className="navbar-start">

            </div>
            <div className="navbar-center">
                <SearchUser></SearchUser>
            </div>
            <div className="navbar-end gap-2">
                <If condition={sessionData != null}>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={sessionData?.user.image!!} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                            <li>
                                <Link href={"./"} className="justify-between">
                                    Profile
                                    <span className="badge-warning badge">WIP</span>
                                </Link>
                            </li>
                            <li><button className="text-error" onClick={() => (signOut())}>Logout</button></li>
                        </ul>
                    </div>
                </If>
            </div>
        </nav>
    </div>
}

function OperatorMenu() {
    return <>

    </>
}