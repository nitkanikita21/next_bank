import { AiOutlineCopy, AiOutlineLink } from "react-icons/ai"
import { CopyButton } from "./copy_button"
import { SafeCard } from "~/server/api/routers/card";
import { twMerge } from "tailwind-merge";
import { api } from "~/trpc/server";
import { useMemo } from "react";

export const balanceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'USD',
});

export async function Card(props: {
    data: SafeCard;
    className?: string;
}) {
    const ownCard = await api.card.byIdSelf.query(props.data.id)
    const separatedNumber = props.data!!.numericalId.replace(/(\d{4})(\d{4})(\d{4})/gm, '$1 $2 $3 ')

    return <>
        <div className={twMerge('card image-full aspect-[3.5/2] h-48 w-auto shadow-xl hover:scale-105 transition-transform duration-500', props.className)}>
            {props.data?.image &&
                <figure>
                    <img
                        className="h-auto w-min select-none"
                        src={props.data!!.image!!}
                        alt="Card Background"
                    />
                </figure>
            }
            <div className="card-body p-4">
                <h2 className="card-title">{props.data!!.name}</h2>
                <div className="flex flex-row items-center justify-between gap-0.5 font-mono text-xl">
                    <span className="select-all">{separatedNumber}</span>
                    <div className="flex flex-row gap-2">
                        <CopyButton
                            tooltipText="Скопіювати посилання на переказ"
                            copyText={`http://localhost:3000/protected/transactions/new?to=${encodeURI(
                                props.data!!.numericalId
                            )}`}
                        >
                            <AiOutlineLink
                                className="transition-all duration-100 active:scale-90"
                                size={22}
                            />
                        </CopyButton>
                        <CopyButton
                            tooltipText="Скопіювати номер карти"
                            copyText={props.data!!.numericalId}
                        >
                            <AiOutlineCopy
                                className="transition-all duration-100 active:scale-90"
                                size={22}
                            />
                        </CopyButton>
                    </div>
                </div>
                <p className="select-all font-mono text-sm">{props.data!!.owner.name}</p>

                {ownCard && <>
                    <div className="card-actions justify-between">
                        <div className="flex flex-row items-center gap-2 font-mono">
                            <span className="">
                                {new Date(
                                    ownCard.createTime
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-2 font-mono">
                            {balanceFormat.format(ownCard.balance)}
                        </div>
                    </div>
                </>}
            </div>
        </div>
    </>
}

