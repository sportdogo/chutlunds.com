import { setCookie, deleteCookie, getCookie } from "cookies-next";
import passport from "passport";
import "../../../../config/passportUser"
import Cookies from 'js-cookie'
import { getLocation } from "../../../../config/firebase/lib";

export default async function (req, res, next) {
    passport.authenticate("google", (err, data) => {
        if (err || !data) {
            return res.redirect(`${process.env.FRONTEND_URL}api/login/login`);
        }


        // set cookie and send redirect

        setCookie('email', data.email, {
            req,
            res, maxAge: 900000
        });


        setCookie('membership', data.membership, {
            req,
            res, maxAge: 900000
        });

        setCookie('countryUpdated_DB', false, {
            req,
            res, maxAge: 900000
        });

        setCookie('account', 'google', {
            req,
            res, maxAge: 900000
        });





        return res.redirect(`${process.env.FRONTEND_URL}`);
    })(req, res, next);
}