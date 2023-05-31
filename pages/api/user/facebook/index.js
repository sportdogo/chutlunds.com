import passport from "passport";
import"../../../../config/passportUser"

export default async function (req, res, next) {
   

  passport.authenticate("facebook", { scope: 'email' })(req, res, next);



}

// router.route("/facebook").get(passport.authenticate('facebook', { scope: 'email' }), facebook);