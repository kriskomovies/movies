import {useEffect, useState} from "react";
import {getMoviesByType} from "@/services/movies";
import {useGetMoviesByTypeQuery} from "@/slices/moviesGridApi";
import MoviesGridWrapper from "@/components/moviesGridWrapper/MoviesGridWrapper";

import styles from "./movies.module.scss"

export default function Movies({serverMovies, totalCount, type}) {
    const [page, setPage] = useState(1);
    const getMore = useGetMoviesByTypeQuery({type: type, page}, {skip: page === 1});

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

export async function getServerSideProps(context) {
    const {type} = context.query;
    const {movies, totalCount} = await getMoviesByType(type);
    console.log("movies", movies)
    return {
        props: {
            serverMovies: JSON.parse(JSON.stringify(movies)),
            totalCount: JSON.parse(JSON.stringify(totalCount)),
            type: type
        }
    }
}
