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
                loader={<h4>Loading...</h4>}
            >
                {movies.map((movie, indx) => (
                    <ItemPopover
                        key={indx}
                        movie={movie}
                    />
                ))}
            </InfiniteScroll>
        </div>
    )
}