import {useState} from "react";
import {useGetMoviesByTypeQuery} from "@/slices/moviesGridApi";
import MoviesGridWrapper from "@/components/moviesGridWrapper/MoviesGridWrapper";
import {ANIME} from "@/constants/moviesTypes";
import {getMoviesByType} from "@/services/movies";

import styles from "./animes.module.scss";

export default function Series({serverMovies, totalCount}) {
    const [page, setPage] = useState(1);
    const type = ANIME;
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
    const {movies, totalCount} = await getMoviesByType(ANIME);
    return {
        props: {
            serverMovies: JSON.parse(JSON.stringify(movies)),
            totalCount: JSON.parse(JSON.stringify(totalCount))
        },
        revalidate: 60
    }
}