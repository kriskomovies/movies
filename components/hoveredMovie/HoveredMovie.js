import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import ReactPlayer from 'react-player/youtube';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import {setSearchString} from "@/slices/searchSlice";

import styles from "./hoveredMovie.module.scss";

export default function HoveredMovie({item, hasPlayer, hasName, handleClose}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const {_id, name, trailer, episode} = item;

    async function handleClick() {
        await dispatch(setSearchString(''))
        handleClose();
        await router.push(`/movie/${_id}`);
    }

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