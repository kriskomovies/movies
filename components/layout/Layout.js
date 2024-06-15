import {Fragment} from "react";
import { Analytics } from "@vercel/analytics/react"
import styles from "./Lauout.module.scss"
export default function Layout (props) {
    return (
        <Fragment>
            <main className={styles.layout}>
                <div className={styles.overlay}>
                    {props.children}
                    <Analytics />
                </div>
            </main>
        </Fragment>
    )
}