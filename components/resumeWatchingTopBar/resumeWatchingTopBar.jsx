import React from 'react';
import styles from "./resumeWatchingTopBar.module.scss";

const ResumeWatchingTopBar = () => {
    return (<div className={styles.topBar}>
        <div>
            Last watched: <span className={styles.movieName}>Thor: poslednoto mukche</span>
        </div>
        <div className={styles.topBarOperations}>
            <div>Resume watching at 20:43</div>
            <i className="fa-solid fa-x"></i>
        </div>
    </div>)
}

export default ResumeWatchingTopBar;