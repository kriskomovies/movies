
import styles from "./carouselItem.module.scss";
export default function CarouselItem({item}) {
    const { poster } = item;

    return (
        <div className={styles.container}>
            <img className={styles.img} src={poster} alt=""/>
        </div>
    )
}