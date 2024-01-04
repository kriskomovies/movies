import {useState} from "react";
import {useGetMoviesByTypeQuery} from "@/slices/moviesGridApi";
import styles from "@/pages/movies/movies.module.scss";
import MoviesGridWrapper from "@/components/moviesGridWrapper/MoviesGridWrapper";
import {SERIE} from "@/constants/moviesTypes";
import {getMoviesByType} from "@/services/movies";

export default function Series({serverMovies, totalCount}) {
    const [page, setPage] = useState(1);
    const type = SERIE;
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
    const {movies, totalCount} = await getMoviesByType(SERIE);
    return {
        props: {
            serverMovies: JSON.parse(JSON.stringify(movies)),
            totalCount: JSON.parse(JSON.stringify(totalCount))
        },
        revalidate: 60
    }
}