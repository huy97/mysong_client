import services from "services";
import { LIST_ARTIST_URL, CREATE_ARTIST_URL, UPDATE_DELETE_ARTIST_URL } from "constants/global";

export const fetchListArtist = async (skip, limit) => {
    return await services.get(LIST_ARTIST_URL, {
        params: {
            skip,
            limit
        }
    });
};

export const createArtist = async (data) => {
    return await services.post(CREATE_ARTIST_URL, data);
}

export const updateArtist = async (artistId, data) => {
    return await services.put(UPDATE_DELETE_ARTIST_URL.replace(':id', artistId), data);
}

export const deleteArtist = async (artistId) => {
    return await services.delete(UPDATE_DELETE_ARTIST_URL.replace(':id', artistId));
}