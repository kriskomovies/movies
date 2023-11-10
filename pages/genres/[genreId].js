import {useEffect, useState} from "react";
import {getMoviesByGenre} from "@/services/movies";
import MoviesGrid from "@/components/moviesGrid/MoviesGrid";
import {useGetMoviesByGenreQuery} from "@/slices/moviesGridApi";

import styles from "./genreId.module.scss";
import MoviesGridWrapper from "@/components/moviesGridWrapper/MoviesGridWrapper";


function MoviesByGenre({serverMovies, totalCount, genreId}) {
    const [page, setPage] = useState(1);
    const getMore = useGetMoviesByGenreQuery({genreId: genreId, page}, {skip: page === 1});

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
    const {genreId} = context.params;
    const {totalCount, movies} = await getMoviesByGenre(genreId);
    return {
        props: {
            serverMovies: JSON.parse(JSON.stringify(movies)),
            totalCount: JSON.parse(JSON.stringify(totalCount)),
            genreId: JSON.parse(JSON.stringify(genreId))
        }
    }
}

export default MoviesByGenre;