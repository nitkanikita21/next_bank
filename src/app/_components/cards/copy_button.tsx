"use client"

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { api } from '~/trpc/server';

export function CopyButton (props: {
    copyText: string;
    tooltipText: string;
    class?: string;
    children: React.ReactElement;
}) {
    const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
    const [timeoutVar, setTimeoutVar] = useState<any | undefined>(undefined);
    api.card.byId.

    async function clickCopy() {
        setShowCopiedTooltip(true);
        if (timeoutVar) {
            clearTimeout(timeoutVar);
        }
        const t = setTimeout(() => {
            setShowCopiedTooltip(false);
        }, 1500);
        setTimeoutVar(t);
        await navigator.clipboard.writeText(props.copyText);
    }

    return (
        <>
            <span
                onClick={clickCopy}
                className={twMerge(
                    'tooltip font-sans',
                    props.class,
                    showCopiedTooltip ? 'tooltip-open tooltip-success' : 'tooltip-info'
                )}
                data-tip={showCopiedTooltip ? 'Скопійовано в буффер' : props.tooltipText}
            >
                {props.children}
            </span>
        </>
    );
}
