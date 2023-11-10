import { useRouter } from 'next/router'
import axios from "axios";
import {getMovieById} from "@/services/movie";
import {MoviePlayer} from "@/components/moviePlayer/MoviePlayer";
import {MovieTag} from "@/components/movieTag/MovieTag";
import Carousel from "@/components/carousel/Carousel";
import SeriesDropdown from "@/components/seriesDropdown/SeriesDropdown";
import {moviesSliderSettings} from "@/lib/settings";

import styles from "./movie.module.scss";


function MovieDetailPage({movie, episodes, seasons}) {
    const router = useRouter();
    const {name, description, poster, genres, season, episode} = movie;

    async function handleSeasonSelect(season) {
        const response = await axios.get(`/api/serie/?name=${name}&season=${season}`);
        const {_id} = response.data.serie;
        await router.push(`/movie/${_id}`);
    }

    return (
        <div className={styles.movieDetailsWrapper}>
            <div className={styles.moviePlayerWrapper}>
                <div className={styles.moviePlayer}>
                    <img src={poster} alt={'test'}/>
                </div>
            </div>
            <div className={styles.movieName}>
                <h1>{name}</h1>
                {season > 0 && <h2>Season : {season} - Episode : {episode}</h2>}
                {season > 0 &&
                    <SeriesDropdown seasons={seasons} currentSeason={season} handleSeasonSelect={handleSeasonSelect}/>}
            </div>
            <div className={styles.moviePlayers}>
                <MoviePlayer playerNumber={1}/>
                <MoviePlayer playerNumber={2}/>
                <MoviePlayer playerNumber={3}/>
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
            {/*<h2>SIMILAR MOVIES</h2>*/}
            {/*<div className={styles.similarMoviesSection}>*/}
            {/*</div>*/}
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