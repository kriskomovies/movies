import {useEffect, useState} from "react";
import MoviesGrid from "@/components/moviesGrid/MoviesGrid";

import styles from "@/pages/movies/movies.module.scss";

export default function MoviesGridWrapper({serverMovies, totalCount, getMore, setPage, page}) {
    const [movies, setMovies] = useState([]);
    const {data} = getMore;

    useEffect(() => {
        setMovies(serverMovies);
    }, [serverMovies])

    useEffect(() => {
        if (data?.movies) {
            setMovies([...movies, ...data.movies])
        }
    }, [data])

    function fetchMore() {
        setPage(page + 1);
    }

    return (
        <div className={styles.container}>
            <MoviesGrid
                movies={movies}
                totalCount={totalCount}
                fetchData={fetchMore}
            />
        </div>
    )
}