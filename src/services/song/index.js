import services from "services";
import { LIST_SONG_URL, CREATE_SONG_URL, UPDATE_DELETE_SONG_URL } from "constants/global";

export const fetchListSong = async (status, isOfficial, keyword, skip, limit) => {
    return await services.get(LIST_SONG_URL, {
       params: {
           status,
           isOfficial,
           keyword,
           skip,
           limit
       } 
    });
};

export const createSong = async (data) => {
    return await services.post(CREATE_SONG_URL, data);
}

export const updateSong = async (songId, data) => {
    return await services.put(UPDATE_DELETE_SONG_URL.replace(':id', songId), data);
}
export const deleteSong = async (songId) => {
    return await services.delete(UPDATE_DELETE_SONG_URL.replace(':id', songId));
}
