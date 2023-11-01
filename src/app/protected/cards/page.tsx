
import { Suspense } from "react"
import { Card } from "~/app/_components/cards/card"
import { api } from "~/trpc/server"
import { AllCards } from "./all_cards"
import { LoadingElem } from "~/app/protected/loading"

export default async function () {
    const cards = await api.card.allSelf.query()
    return <>
        <div className="flex flex-col space-y-4">
            <h1 className="text-6xl font-extrabold">Ваші картки</h1>
            <Suspense fallback={<LoadingElem text={"Завантаження карток"}  />}>
                <AllCards />
            </Suspense>
        </div>
    </>
}