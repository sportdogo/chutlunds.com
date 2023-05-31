import passport from "passport";
import"../../../../config/passportUser"

export default async function (req, res, next) {

  passport.authenticate("google", { scope: ['email', 'profile'], })(req, res, next);
  
}



