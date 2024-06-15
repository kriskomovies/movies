import ReactPlayer from 'react-player/youtube';
import MoviesButton from "@/components/moveisButton/moviesButton";

import styles from "./hoveredMovie.module.scss";

export default function HoveredMovie({movie, hasPlayer, hasName, handleClick}) {
    const {name, trailer, episode} = movie;
    return (
        <div className={styles.itemWrapper}>
            {
                hasPlayer &&
                <ReactPlayer
                    className={styles.video}
                    playing={false}
                    url={trailer}
                    controls={true}
                />
            }
            <hr/>
            <div className={styles.movieDescription}>
                <MoviesButton text="PLAY NOW" iconName="fa-solid fa-play" onClick={handleClick}/>
            </div>
        </div>
    )
}