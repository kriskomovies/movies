import ReactPlayer from 'react-player/youtube';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';

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
            <div className={styles.movieDescription}>
                <PlayCircleFilledOutlinedIcon
                    className={styles.playIcon}
                    onClick={handleClick}
                />
                <div className={styles.movieName}>
                    <h2>{name}</h2>
                </div>
            </div>
            {
                hasName &&
                <div className={styles.textDescription}>
                    <h2>Episode : {episode}</h2>
                </div>
            }
        </div>
    )
}