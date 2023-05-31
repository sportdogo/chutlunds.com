import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
const FacebookStrategy = require("passport-facebook").Strategy;
import { getCookie, deleteCookie } from "cookies-next";

passport.use(
    "google",
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.FRONTEND_URL}api/user/google/callback`,

        passReqToCallback: true

    },
        async function (request, accessToken, refreshToken, profile, done) {

            try {


                const displayName = profile.displayName
                const firstName = displayName.substring(displayName.length[0], displayName.indexOf(' ')).trim();
                const lastName = displayName.substring(displayName.indexOf(' '), displayName.length).trim();




                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    email: profile.emails[0].value,
                    profilePicUrl: profile.photos[0].value,
                    accountType: "google"
                }

            
                const parcelData = { firstName: firstName.trim(), lastName: lastName.trim(), email: profile.emails[0].value, password: 'NOT_SET', country: ""}

                const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/fb_googleLogin`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(parcelData),
                });


                const response = await rawResponse.json();



                if (response.success) {
                    return done(null, response.data);
                }

            } catch (err) {
                console.error(err);
                done(err, false, { message: "Internal server error" });
            }
        }
    )
);



passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.FRONTEND_URL}api/user/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email']

    },
        async function (request, accessToken, refreshToken, profile, done) {

            try {

                const displayName = profile.displayName
                const firstName = displayName.substring(displayName.length[0], displayName.indexOf(' ')).trim();
                const lastName = displayName.substring(displayName.indexOf(' '), displayName.length).trim();




                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    email: profile.emails[0].value,
                    profilePicUrl: profile.photos[0].value,
                    accountType: "google"
                }

                const parcelData = { firstName: firstName.trim(), lastName: lastName.trim(), email: profile.emails[0].value, password: 'NOT_SET', country: "" }

                const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/fb_googleLogin`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(parcelData),
                });
                const response = await rawResponse.json();
                if (response.success) {
                    return done(null, response.data);
                }

            } catch (err) {
                console.error(err);
                done(err, false, { message: "Internal server error" });
            }
        }
    )
);



