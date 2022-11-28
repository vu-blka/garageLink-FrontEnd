//const BASE_URL = 'http://192.168.1.11:5000';
const BASE_URL = 'http://localhost:5000';

//account
export const API_GET_INFO_USER = `${BASE_URL}/api/user/get-user-info`;
export const API_UPDATE_INFO_USER = `${BASE_URL}/api/user/update`;
export const API_SIGNIN = `${BASE_URL}/api/account/sign-in`;
export const API_SIGNUP = `${BASE_URL}/api/account/signup`;
export const API_FORGOT_PASSWORD = `${BASE_URL}/api/account/forgot-password`;

export const API_UPDATE_PASSWORD = `${BASE_URL}/api/user/updatePassword`;

// description

export const API_GET_ALL_DESCRIPTION = `${BASE_URL}/api/description/get-all`;
export const API_CREATE_DESCRIPTION = `${BASE_URL}/api/description/create`;

// manufacturer

export const API_GET_ALL_MANUFACTURER = `${BASE_URL}/api/manufacturer/get-all`;
export const API_CREATE_MANUFACTURER = `${BASE_URL}/api/manufacturer/create`;

// product

export const API_CREATE_PRODUCT = `${BASE_URL}/api/product/create`;
export const API_GET_ALL_PRODUCT = `${BASE_URL}/api/product/get-all`;
export const API_GET_PRODUCT_BY_ID_MANUFACTURER = `${BASE_URL}/api/product/get-product-by-manufacturer`;
export const API_GET_PRODUCT_BY_TYPE = `${BASE_URL}/api/product/get-product-by-type`;
export const API_GET_PRODUCT_BY_ID = `${BASE_URL}/api/product/get-product-by-id`;
export const API_UPDATE_PRODUCT_BY_ID = `${BASE_URL}/api/product/update`;
export const API_DELETE_PRODUCT_BY_ID = `${BASE_URL}/api/product/delete`;

// product type

export const API_GET_ALL_PRODUCT_TYPE = `${BASE_URL}/api/product-type/get-all`;
export const API_CREATE_PRODUCT_TYPE = `${BASE_URL}/api/productType/create`;

// role

export const API_GET_ALL_ROLE = `${BASE_URL}/api/role/get-all`;
export const API_CREATE_ROLE = `${BASE_URL}/api/role/create`;

// service

export const API_CREATE_SERVICE = `${BASE_URL}/api/service/create`;
export const API_GET_ALL_SERVICE = `${BASE_URL}/api/service/get-all`;
export const API_GET_SERVICE_BY_TYPE = `${BASE_URL}/api/service/get-service-by-type`;
export const API_GET_SERVICE_BY_ID = `${BASE_URL}/api/service/get-service-by-id`;
export const API_UPDATE_SERVICE_BY_ID = `${BASE_URL}/api/service/update`;
export const API_DELETE_SERVICE_BY_ID = `${BASE_URL}/api/service/delete`;

// service type

export const API_GET_ALL_SERVICE_TYPE = `${BASE_URL}/api/serviceType/get-all`;
export const API_CREATE_SERVICE_TYPE = `${BASE_URL}/api/serviceType/create`;

//cart

export const API_CREATE_CART_MAIN = `${BASE_URL}/api/cart/create`;
export const API_DELETE_CART_MAIN = `${BASE_URL}/api/cart/delete`;
export const API_GET_CART_BY_ID = `${BASE_URL}/api/cart/get-cart-by-id`;
export const API_CREATE_DESCRIPTION_BY_ID = `${BASE_URL}/api/cartDescription/get-cartdes-by-id`;
export const API_DELETE_DESCRIPTION_BY_ID = `${BASE_URL}/api/cartDescription/delete`;
export const API_CONFIRM_DESCRIPTION_BY_ID = `${BASE_URL}/api/cartDescription/confirm`;

//email
export const API_SEND_EMAIL = `${BASE_URL}/api/mail/sendMail`;
