import { Client, ID, Query, TablesDB } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID)

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DB_ID,
            tableId: "metrics",
            queries: [
                Query.equal("searchTerm", searchTerm)
            ]
        });

        if (result.rows.length > 0) {
            const row = result.rows[0];
            await tablesDB.updateRow({
                databaseId: DB_ID,
                tableId: "metrics",
                rowId: row.$id,
                data: {
                    count: row.count + 1,
                },
            });
        } else {
            await tablesDB.createRow({
                databaseId: DB_ID,
                tableId: "metrics",
                rowId: ID.unique(),
                data: {
                    searchTerm,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    movie_id: movie.id,
                },
            });
        }

    } catch (error) {
        console.error("updateSearchCount failed: ", error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DB_ID,
            tableId: "metrics",
            queries: [
                Query.limit(5),
                Query.orderDesc("count")
            ],
        });

        return result.rows;
    } catch (error) {
        console.error("getTrendingMovies failed: ", error);
    }
}
