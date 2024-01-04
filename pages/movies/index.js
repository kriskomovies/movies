import {useEffect, useState} from "react";
import {getMoviesByType} from "@/services/movies";
import {useGetMoviesByTypeQuery} from "@/slices/moviesGridApi";
import MoviesGridWrapper from "@/components/moviesGridWrapper/MoviesGridWrapper";
import {MOVIE} from "@/constants/moviesTypes";
import styles from "./movies.module.scss"

export default function Movies({serverMovies, totalCount}) {
    const [page, setPage] = useState(1);
    const type = MOVIE;
    const getMore = useGetMoviesByTypeQuery({type, page}, {skip: page === 1});

    return (
        <div className={styles.container}>
            <MoviesGridWrapper
                serverMovies={serverMovies}
                totalCount={totalCount}
                getMore={getMore}
                setPage={setPage}
                page={page}
            >
            </MoviesGridWrapper>
        </div>

    )
}

export async function getStaticProps(context) {
    const {movies, totalCount} = await getMoviesByType(MOVIE);
    return {
        props: {
            serverMovies: JSON.parse(JSON.stringify(movies)),
            totalCount: JSON.parse(JSON.stringify(totalCount))
        },
        revalidate: 60
    }
}
