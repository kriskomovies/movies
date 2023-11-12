import styles from "./carouselItem.module.scss";

export default function CarouselItem({movie, hasName}) {
    const {poster, episode} = movie;

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.img} src={poster} alt=""/>
            </div>
            {
                hasName &&
                <div className={styles.movieName}>
                    <h2>Episode: {episode}</h2>
                </div>
            }
        </div>
    )
}