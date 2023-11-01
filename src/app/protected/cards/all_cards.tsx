import { Suspense } from "react"
import { Card } from "~/app/_components/cards/card"
import { api } from "~/trpc/server"

export async function AllCards() {
    const cards = await api.card.allSelf.query()
    return <>
        <div className="flex gap-x-8">
            {cards.map((v, i) => (<Card data={v} key={i}></Card>))}
        </div>
    </>
}