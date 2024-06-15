import {Fragment} from "react";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import styles from "./Lauout.module.scss"
export default function Layout (props) {
    return (
        <Fragment>
            <main className={styles.layout}>
                <div className={styles.overlay}>
                    {props.children}
                    <Analytics />
                    <SpeedInsights />
                </div>
            </main>
        </Fragment>
    )
}