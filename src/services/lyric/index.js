import { CREATE_LYRIC_URL, GET_LYRIC_URL, UPDATE_DELETE_LYRIC_URL } from "constants/global";
import services from 'services';

export const createLyric = async (songId, content) => {
    return await services.post(CREATE_LYRIC_URL, {
        songId,
        content
    });
}

export const fetchSongLyric = async (songId) => {
    return await services.get(GET_LYRIC_URL.replace(':id', songId));
}

export const updateSongLyric = async (lyricId, content) => {
    return await services.put(UPDATE_DELETE_LYRIC_URL.replace(':id', lyricId), {
        content
    });
}

export const deleteSongLyric = async (lyricId) => {
    return await services.delete(UPDATE_DELETE_LYRIC_URL.replace(':id', lyricId));
}