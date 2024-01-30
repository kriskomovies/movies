import {getAllMovies} from "@/services/movies";

export default function HomePage(props) {
    return (
        <div>
            kur
        </div>
    )
}


export async function getStaticProps(context) {
    const {movies, totalCount} = await getAllMovies();
    return {
        props: {
            serverMovies: JSON.parse(JSON.stringify(movies)),
            totalCount: JSON.parse(JSON.stringify(totalCount))
        },
        revalidate: 60
    }
}