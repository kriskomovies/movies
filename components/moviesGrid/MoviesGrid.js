import ItemPopover from "@/components/itemPopover/ItemPopover";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./moviesGrid.module.scss";

export default function MoviesGrid({movies, totalCount, fetchData}) {
    const hasMore = totalCount - movies.length > 0;

    return (
        <div className={styles.container} >
            <InfiniteScroll
                className={styles.containerItems}
                dataLength={movies.length}
                next={fetchData}
                hasMore={hasMore}
            >
                {movies.map((movie, index) => (
                    <ItemPopover
                        key={`${movie._id}+${index}`}
                        movie={movie}
                    />
                ))}
            </InfiniteScroll>
        </div>
    )
}