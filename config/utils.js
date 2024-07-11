// utils/cookies.js
import { setCookie, destroyCookie, getCookie } from 'cookies-next';

export const getViewTypeFromCookie = () => {
    return getCookie('viewType') ; 
};

export const setViewTypeCookie = (value) => {
    setCookie('viewType', value, { maxAge: 60 * 60 * 24 * 365 }); // Set cookie with expiry of 7 days
};

export const removeViewTypeCookie = () => {
    destroyCookie('viewType');
};
