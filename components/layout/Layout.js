import {Fragment} from "react";
import styles from "./Lauout.module.scss"
export default function Layout (props) {
    return (
        <Fragment>
            <main className={styles.layout}>
                <div className={styles.overlay}>
                    {props.children}
                </div>
            </main>
        </Fragment>
    )
}