import styles from "./carouselItem.module.scss";

export default function CarouselItem({movie, hasName}) {
    const {poster, episode, episodeName} = movie;

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.img} src={poster} alt=""/>
            </div>
            {
                hasName &&
                <div className={styles.movieName}>
                    <div className={styles.episodeName}>
                        <div className={styles.episodeParts}>Episode : {episode}</div>
                        {episodeName &&  <div className={styles.episodeParts} >{episodeName}</div>}
                    </div>
                </div>
            }
        </div>
    )
}