export const PERMISSION_CODE = {
    READ: "READ",
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    MANAGER: "MANAGER"
}

export const OLD_PASSWORD_MANAGER = "OLD_PASSWORD_MANAGER";

export const MEDIA_TYPE = {
    AUDIO: "AUDIO",
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
    OTHER: "OTHER",
};

export const SONG_STATUS = {
    PRIVATE: 0,
    ACTIVE: 1,
    PENDING: 2
};

export const API_URL = 'http://localhost:8686/api/v1';
export const CDN_URL = 'http://localhost:8686/cdn/';
export const LOGIN_URL = '/user/login';
export const REGISTER_URL = '/user/register';
export const GET_USER_INFO_URL = '/user/get-user-info';
export const LIST_SONG_URL = "/song/get-list-songs";
export const CREATE_SONG_URL = "/song/create";
export const UPDATE_DELETE_SONG_URL = "/song/:id";
export const CREATE_LYRIC_URL = "/song/lyric/create";
export const GET_LYRIC_URL = "/song/:id/lyrics";
export const UPDATE_DELETE_LYRIC_URL = "/song/lyric/:id";
export const LIST_ARTIST_URL = "/artist/get-list-artists";
export const CREATE_ARTIST_URL = "/artist/create";
export const UPDATE_DELETE_ARTIST_URL = "/artist/:id";
export const LIST_CATEGORY_URL = "/category/get-list-categories";
export const CREATE_CATEGORY_URL = "/category/create";
export const UPDATE_DELETE_CATEGORY_URL = "/category/:id";
export const UPLOAD_MEDIA = "/media/upload";
