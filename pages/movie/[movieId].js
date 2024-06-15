import {useRouter} from 'next/router'
import axios from "axios";
import {getMovieById} from "@/services/movie";
import {MovieTag} from "@/components/movieTag/MovieTag";
import Carousel from "@/components/carousel/Carousel";
import SeriesDropdown from "@/components/seriesDropdown/SeriesDropdown";
import {moviesSliderSettings} from "@/lib/settings";

import styles from "./movie.module.scss";
import MoviesButton from "@/components/moveisButton/moviesButton";


function MovieDetailPage({movie, episodes, seasons}) {
    const router = useRouter();
    const {name, description, poster, genres, season, episode, vidPlayer, episodeName} = movie;

    async function handleSeasonSelect(season) {
        const response = await axios.get(`/api/serie/?name=${name}&season=${season}`);
        const {_id} = response.data.serie;
        await router.push(`/movie/${_id}`);
    }

    return (
        <div className={styles.movieDetailsWrapper}>
            <div className={styles.moviePlayerWrapper}>
                <div className={styles.moviePlayer}>
                    <iframe
                        allowFullScreen={true}
                        src={vidPlayer}
                        width="100%"
                        height="100%"
                        className={styles.iFrame}
                    />
                </div>
            </div>
            <div className={styles.movieName}>
                <h1>{name}</h1>
                {
                    season > 0 &&
                    <>
                        <h2> {episodeName} </h2>
                        <h2> Season : {season} - Episode : {episode}</h2>
                        <SeriesDropdown
                            seasons={seasons}
                            currentSeason={season}
                            handleSeasonSelect={handleSeasonSelect}
                        />
                    </>
                }
            </div>
            <div className={styles.moviePlayers}>
                <MoviesButton text="Player 1" iconName="fa-solid fa-circle-play"/>
                <MoviesButton text="Player 2" iconName="fa-solid fa-circle-play"/>
                <MoviesButton text="Player 3" iconName="fa-solid fa-circle-play"/>
            </div>
            <h2>MOVIE DETAILS</h2>
            <div className={styles.movieDetails}>
                {description}
                <hr/>
                <div className={styles.movieTags}>
                    {genres.map(({name}, indx) => <MovieTag key={indx} tagName={name}/>)}
                </div>
            </div>
            {
                seasons?.length &&
                <div>
                    <Carousel
                        settings={moviesSliderSettings}
                        movies={episodes}
                        hasPlayer={false}
                        hasName={true}
                    >
                    </Carousel>
                </div>
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    const {movieId} = context.params

    const movie = await getMovieById(movieId);

    return {
        props: {
            ...JSON.parse(JSON.stringify(movie))
        }
    }
}

export default MovieDetailPage;