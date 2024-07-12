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


export const formatDuration = (duration) => {
    const minutes = parseInt(duration.replace('m', ''), 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};
