"use client"

import { signIn } from "next-auth/react"

export default function () {
    function Discord() {
        signIn("discord", {callbackUrl: "/protected"})
    }

    return <>
        <div className="h-screen justify-center items-center bg-base-200 w-full flex flex-row">
            <div className="p-6 bg-base-100 shadow-xl flex flex-col gap-4 items-center card">
                <h1>Увійти</h1>
                <button className="btn btn-primary px-8" onClick={Discord}>Discord</button>
            </div>
        </div>
    </>
}