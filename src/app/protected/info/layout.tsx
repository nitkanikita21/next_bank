import { ReactElement } from "react";

export default function(props: {children: ReactElement[]}) {
    return <article className="prose lg:prose-xl h-fit">
        {props.children}
    </article>
}