import services from "services";
import { LIST_ARTIST_URL } from "constants/global";

export const fetchListArtist = async (skip, limit) => {
    return await services.get(LIST_ARTIST_URL, {
        params: {
            skip,
            limit
        }
    });
};