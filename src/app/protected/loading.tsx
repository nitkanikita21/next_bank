export default function() {
    return <>
        <div className="w-full flex flex-col justify-center items-center">
            <LoadingElem text="Завантаження сторінки"/>
        </div>
    </>
}

export function LoadingElem({text}: {text: string}) {
    return <>
        <div className="w-full h-full py-6 items-center flex flex-col">
            <h2 className="text-xl font-bold">{text}</h2>
            <span className="loading loading-dots loading-lg text-secondary"></span>
        </div>
    </>
}