"use client"

import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { signIn, useSession } from "next-auth/react"
import { If } from "react-extras";


export default function Home() {
    const { data: sessionData } = useSession()
    function login() {
        signIn()
    }

    return <>
        <main className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">ІБанк</h1>
                    <p className="py-6"></p>
                    <If condition={sessionData != null}>
                        <a className="btn btn-primary" href="/protected">Перейти до кабінету</a>
                    </If>
                    <If condition={sessionData == null}>
                        <button className="btn btn-primary" onClick={login}>Почати</button>
                    </If>
                </div>
            </div>
        </main>
    </>
}
