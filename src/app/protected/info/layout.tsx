import { ReactElement } from "react";

export default function(props: {children: ReactElement[]}) {
    return <div className="prose lg:prose-xl">
        {props.children}
    </div>
}