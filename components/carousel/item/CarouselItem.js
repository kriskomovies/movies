import { useState } from 'react';
import Image from 'next/image';
import styles from './carouselItem.module.scss';

export default function CarouselItem({ movie, hasName }) {
    const [isHovered, setIsHovered] = useState(false);
    const { poster, episode, episodeName, name, imdbRating } = movie;

    return (
        <div className={styles.container}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            <div
                className={`${styles.imageContainer} ${isHovered ? styles.hovered : ''}`}
            >
                <Image
                    className={styles.img}
                    src={poster}
                    width={250}
                    height={300}
                    alt=""
                />
            </div>
            <div className={styles.carouselHoverContent}>
                <div className={styles.hoverMovieName}>{name}</div>
                <hr />
                <div className={styles.hoverMovieRating}>
                    Rating: <span>{imdbRating}</span>/10.0
                </div>
            </div>
            {hasName && (
                <div className={styles.movieName}>
                    <div className={styles.episodeName}>
                        <div className={styles.episodeParts}>Episode: {episode}</div>
                        {episodeName && <div className={styles.episodeParts}>{episodeName}</div>}
                    </div>
                </div>
            )}
        </div>
    );
}