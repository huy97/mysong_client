import services from "services";
import {UPLOAD_MEDIA} from "constants/global";

export const uploadMedia = async (file, onProgress) => {
    let formData = new FormData();
    formData.append('file', file);
    return await services.post(UPLOAD_MEDIA, formData, {
        onUploadProgress: onProgress
    });
}