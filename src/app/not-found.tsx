"use client"
import { useRouter } from "next/navigation"

export default function NotFoundPage() {
    const router = useRouter()
    return <>
        <div className="w-full h-screen justify-center items-center flex flex-col">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-8xl font-extrabold">404</h1>
                <div className="divider text-2xl">😒</div>
                <p className="">Сторінка не існує</p>
                
                <button className="btn btn-primary" onClick={() => (router.back())}>Повернутися</button>
            </div>
        </div>
    </>
}