import { ReactElement } from "react"

export default function(props: {
    when: boolean,
    children: ReactElement[]
}) {
    if(props.when) {
        return props.children
    }
    return <></>
}