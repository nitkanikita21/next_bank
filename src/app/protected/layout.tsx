"use client"

import { signOut, useSession } from "next-auth/react";
import Show from "../_components/show";
import { ReactElement, Suspense } from "react";
import { AiFillHome, AiOutlineUser, AiFillCreditCard, AiOutlineTransaction, AiOutlineInfoCircle } from "react-icons/ai"
import { FiBox } from "react-icons/fi"
import { FaMapLocationDot } from "react-icons/fa6"
import { If } from "react-extras";
import { useRouter } from "next/navigation";

export default function (props: { children: ReactElement[] }) {

    const router = useRouter()

    const { data: sessionData } = useSession({required: true })

    return <>
        {/* <div className="sticky top-0 z-10 flex flex-row items-center gap-2 px-4 py-2 pt-4 bg-opacity-90 backdrop-blur">
            <div className="px-2 avatar">
                <div className="w-12 rounded-full">
                    {sessionData && <img src={sessionData.user.image!!} />}
                </div>
            </div>
            <div className="text-lg font-bold">{sessionData?.user.name ?? ""}</div>
        </div> */}
        <TopNavBar />
        <div className="flex flex-row bg-base-100">
            <nav className="drawer drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">{props.children}</div>
                <div className="drawer-side">
                    <ul className="min-h-full p-4 menu w-80 text-base-content">
                        <li>
                            <a className="font-bold" href="/">
                                <FiBox className="text-secondary" size={24} />
                                На головну
                            </a>
                        </li>

                        <li></li>
                        <li className="flex flex-row items-center gap-4 menu-title">
                            <span>
                                <AiFillHome className="text-secondary" size={24} />
                            </span>
                            <span>Ваш кабінет</span>
                        </li>
                        <li>
                            <a href="/protected" className="font-bold">
                                <AiOutlineUser size={24} /> Ваш профіль
                            </a>
                        </li>
                        <li>
                            <a href="/protected/cards" className="font-bold">
                                <AiFillCreditCard size={24} /> Картки
                            </a>
                        </li>
                        <li>
                            <a href="/protected/transactions" className="font-bold">
                                <AiOutlineTransaction size={24} /> Транзакції
                            </a>
                        </li>

                        <li></li>
                        <li className="flex flex-row items-center gap-4 menu-title">
                            <span>
                                <AiOutlineInfoCircle className="text-secondary" size={24} />
                            </span>
                            <span>Інформація</span>
                        </li>
                        <li>
                            <a href="/protected/info/points" className="font-bold">
                                <FaMapLocationDot size={24} /> Філіали
                            </a>
                        </li>

                        <li></li>
                        <li className="flex flex-row items-center gap-4 menu-title">
                            <span>
                                <AiOutlineUser className="text-secondary" size={24} />
                            </span>
                            <span>Аккаунт</span>
                        </li>
                        <li>
                            <button
                                className="font-bold"
                                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                            >
                                <FiBox className="text-error" size={24} />
                                Вийти з аккаунту
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </>
}

function TopNavBar() {
    const { data: sessionData } = useSession()
    return <nav className="navbar bg-base-100 px-4">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Особистий кабінет</a>
        </div>
        <div className="flex-none gap-2">
            <If condition={sessionData != null}>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={sessionData?.user.image!!} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge-warning badge">WIP</span>
                            </a>
                        </li>
                        <li><button className="text-error" onClick={()=>(signOut())}>Logout</button></li>
                    </ul>
                </div>
            </If>
        </div>
    </nav>
}