import { AnimatePresence, motion, usePresence } from "framer-motion"
import { For, If } from "react-extras"
import { PiWarningBold } from "react-icons/pi"
import { GrCircleAlert } from "react-icons/gr"
import { create } from "zustand"
import { AiOutlineCheck } from "react-icons/ai"
import { VscError } from "react-icons/vsc"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react"
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi"

export interface Alert {
    type: "tip" | "info" | "success" | "warning" | "error",
    content: React.ReactElement
}

export interface AlertsState {
    alerts: Alert[]
    push: (alert: Alert) => void
}

export const useAlertsStore = create<AlertsState>((set) => ({
    alerts: [],
    push(alert) {
        return set((state) => ({
            alerts: [...state.alerts, alert]
        }))
    },
}))

export function Alerts({hide = true}: {hide: boolean}) {
    const alertsStore = useAlertsStore()

    return <>
        {
            alertsStore.alerts.map((v, i) => (
                <Alert hide={hide} key={i} alert={v} />
            ))
        }
    </>
}

function Alert({ alert, key, hide = false }: { alert: Alert, key: number, hide: boolean }) {
    let [show, setShow] = useState(true)
    
    useEffect(()=>{
        if(hide) {
            setTimeout(()=>{
                setShow(false)
            }, 8000)
        }
    }, [])

    let alertClass = ""
    switch (alert.type) {
        case "info":
            alertClass = "alert-info"
            break;
        case "success":
            alertClass = "alert-success"
            break;
        case "warning":
            alertClass = "alert-warning"
            break;
        case "error":
            alertClass = "alert-error"
            break;
        default:
            break
    }

    let alertIcon: React.ReactElement = <FiAlertCircle className="stroke-blue-400" size={24} />
    switch (alert.type) {
        case "info":
            alertIcon = <FiAlertCircle size={24} />
            break;
        case "success":
            alertIcon = <AiOutlineCheck size={24} />
            break;
        case "warning":
            alertIcon = <PiWarningBold size={24} />
            break;
        case "error":
            alertIcon = <VscError size={24} />
            break;
        default:
            break
    }

    return <>
        <AnimatePresence>
            {show && <>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    className={twMerge("alert", alertClass)}
                >
                    {alertIcon}
                    {alert.content}
                </motion.div>
            </>}
        </AnimatePresence>
    </>
}