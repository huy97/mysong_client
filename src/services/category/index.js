import services from "services";
import { LIST_CATEGORY_URL, CREATE_CATEGORY_URL, UPDATE_DELETE_CATEGORY_URL } from "constants/global";

export const fetchListCategory = async (skip, limit) => {
    return await services.get(LIST_CATEGORY_URL, {
        params: {
            skip,
            limit
        }
    });
};

export const createCategory = async (data) => {
    return await services.post(CREATE_CATEGORY_URL, data);
}

export const updateCategory = async (categoryId, data) => {
    return await services.put(UPDATE_DELETE_CATEGORY_URL.replace(':id', categoryId), data);
}

export const deleteCategory = async (categoryId) => {
    return await services.delete(UPDATE_DELETE_CATEGORY_URL.replace(':id', categoryId));
}