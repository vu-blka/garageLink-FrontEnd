import {
    API_GET_INFO_USER,
    API_UPDATE_INFO_USER,
    API_SIGNIN,
    API_SIGNUP,
    API_FORGOT_PASSWORD,
    API_GET_ALL_DESCRIPTION,
    API_CREATE_DESCRIPTION,
    API_GET_ALL_MANUFACTURER,
    API_CREATE_MANUFACTURER,
    API_CREATE_PRODUCT,
    API_GET_ALL_PRODUCT,
    API_GET_PRODUCT_BY_ID_MANUFACTURER,
    API_GET_PRODUCT_BY_TYPE,
    API_GET_PRODUCT_BY_ID,
    API_GET_ALL_PRODUCT_TYPE,
    API_UPDATE_PRODUCT_BY_ID,
    API_DELETE_PRODUCT_BY_ID,
    API_CREATE_PRODUCT_TYPE,
    API_GET_ALL_ROLE,
    API_CREATE_ROLE,
    API_CREATE_SERVICE,
    API_GET_ALL_SERVICE,
    API_GET_SERVICE_BY_TYPE,
    API_GET_SERVICE_BY_ID,
    API_UPDATE_SERVICE_BY_ID,
    API_DELETE_SERVICE_BY_ID,
    API_GET_ALL_SERVICE_TYPE,
    API_CREATE_SERVICE_TYPE,
    API_CREATE_CART_MAIN,
    API_DELETE_CART_MAIN,
    API_UPDATE_PASSWORD,
    API_GET_CART_BY_ID,
    API_CREATE_DESCRIPTION_BY_ID,
    API_CONFIRM_DESCRIPTION_BY_ID,
    API_DELETE_DESCRIPTION_BY_ID,
    API_SEND_EMAIL,
} from './configs';
import axios from 'axios';

export const deleteCartByIdAPI = async (id) => {
    try {
        const response = await axios.delete(
            `${API_DELETE_DESCRIPTION_BY_ID}?id=${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const deleteCardAPI = async (id) => {
    try {
        const response = await axios.delete(
            `${API_DELETE_CART_MAIN}?id=${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const confirmCartByIdAPI = async (body) => {
    try {
        const response = await axios.patch(API_CONFIRM_DESCRIPTION_BY_ID, body);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};
export const getCartByIdAPI = async (id) => {
    try {
        const response = await axios.get(`${API_GET_CART_BY_ID}?id=${id}`);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};
export const getCartDescriptionAPI = async (id) => {
    try {
        const response = await axios.get(
            `${API_CREATE_DESCRIPTION_BY_ID}?id=${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getUserInfoV2 = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(API_GET_INFO_USER, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const signUpAPI = async (body) => {
    try {
        const response = await axios.post(API_SIGNUP, body);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const loginAPI = async (body) => {
    try {
        const response = await axios.post(API_SIGNIN, body);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const forgotPasswordAPI = async (body) => {
    try {
        const response = await axios.post(API_FORGOT_PASSWORD, body);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getAllServiceAPI = async () => {
    try {
        const response = await axios.get(API_GET_ALL_SERVICE);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getAllServiceTypeAPI = async () => {
    try {
        const response = await axios.get(API_GET_ALL_SERVICE_TYPE);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getAServiceByTypeAPI = async (id) => {
    try {
        const response = await axios.get(
            `${API_GET_SERVICE_BY_TYPE}?serviceTypeId=${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getAServiceByIDAPI = async (id) => {
    try {
        const response = await axios.get(
            `${API_GET_SERVICE_BY_ID}?serviceId=${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const updateServiceByIDAPI = async (id) => {
    try {
        const response = await axios.patch(`${API_UPDATE_SERVICE_BY_ID}/${id}`);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const deleteServiceByIDAPI = async (id) => {
    try {
        const response = await axios.delete(
            `${API_DELETE_SERVICE_BY_ID}/${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getAllProductAPI = async () => {
    try {
        const response = await axios.get(API_GET_ALL_PRODUCT);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const updateProductByIDAPI = async (id) => {
    try {
        const response = await axios.get(`${API_UPDATE_PRODUCT_BY_ID}/${id}`);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const deleteProductByIDAPI = async (id) => {
    try {
        const response = await axios.delete(
            `${API_DELETE_PRODUCT_BY_ID}/${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getAllProductTypeAPI = async () => {
    try {
        const response = await axios.get(API_GET_ALL_PRODUCT_TYPE);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const getProductByTypeAPI = async (id) => {
    try {
        const response = await axios.get(
            `${API_GET_PRODUCT_BY_TYPE}?productTypeId=${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};
export const getProductByIDAPI = async (id) => {
    try {
        const response = await axios.get(
            `${API_GET_PRODUCT_BY_ID}?productId=${id}`
        );
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};
//API_CREATE_CART_MAIN
export const createCartAPI = async (body) => {
    try {
        const response = await axios.post(API_CREATE_CART_MAIN, body);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const updatePasswordAPI = async (body) => {
    try {
        const response = await axios.patch(API_UPDATE_PASSWORD, body);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const updateInfoAPI = async (body) => {
    try {
        const response = await axios.patch(API_UPDATE_INFO_USER, body);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};

export const sendEmailAPI = async (body) => {
    try {
        const response = await axios.post(API_SEND_EMAIL, body);
        return response;
    } catch (error) {
        return error?.response?.data || error;
    }
};
