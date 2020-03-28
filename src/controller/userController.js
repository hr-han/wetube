import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
}

export const postJoin = async (req, res, next) => {
    const {
            body: { name, email, password, password2}
        } = req;
    
    if (password !== password2) {
        req.flash('error', `Passwords don't match!`)
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            // TODO : register User
            const user = await User({
            name,
            email
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home)
        }
    }
}

export const githubLogin = passport.authenticate("github", {
         successFlash: "WELCOME!",
         failureFlash: "Can't Login"
       });

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};


export const githubLoginCallback = async (_, __, profile, cb) => {
    const { _json: { id, avatar_url: avatarUrl, name }} = profile

    const email = profile.emails[0].value
    //console.log(profile);
    

    try {
        const user = await User.findOne({email});
        //console.log(user);
        if (user) {
            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.save();
            return cb(null, user)
        }

        const uewUser = await User.create({
            email, 
            name, 
            githubId: id, 
            avatarUrl
        });
        return cb(null, uewUser);
    } catch (error) {
        return cb(error);
    }
};


export const facebookLogin = passport.authenticate("facebook", {
         successFlash: "WELCOME!",
         failureFlash: "Can't Login"
       });

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLoginCallback = async (_, __, profile, cb) => {
    const {
      _json: {
        id,
        name,
        email
      }
    } = profile;

     //console.log(id, name, email);
    
    try {
        const user = await User.findOne({email});
        if (user) {
            user.facebookId = id;
            user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
            user.save();
            return cb(null, user)
        }

        const uewUser = await User.create({
          email,
          name,
          facebookId: id,
          avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, uewUser);
    } catch (error) {
        return cb(error);
    }

};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: "WELCOME!",
    failureFlash:"Can't Login"

});

export const logout = (req, res) => {
    req.flash('info', "Logged out, see you later!")
    req.logout();
    res.redirect(routes.home)
}

export const getMe = async (req, res) => {
         const user = await User.findById(req.user.id).populate("videos");

         // 로그인 유저정보 전달
         res.render("userDetail", { pageTitle: "User Detail", user: user });
       };

export const userDetail = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const user = await User.findById(id).populate('videos');
        console.log(user);
        res.render("userDetail", { pageTitle:"User Detail", user});
    } catch (error) {
        req.flash('error', "User not found.")
        console.log(error);
        res.redirect(routes.home)
        
    }
}
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
    const {
        body: {name, email},
        file
    } = req
    try {
    //console.log(req.user);
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? `${file.location}` : req.user.avatarUrl
        });
        req.flash("success", "Profile updated.");
        res.redirect(routes.me);
    
    } catch (error) {
        req.flash("error", "Can't update profile.");
        console.log(error);
        res.redirect(routes.editProfile);
    }
}
export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
    const {
      body: { oldPassword, newPassword, newPassword1 }
    } = req;

    try {
        if (newPassword !== newPassword1) {
            res.status(400)
            req.flash("error", "passwords don't match.");
            res.redirect(`/users/${routes.changePassword}`);
            return
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        console.log(error);
        res.status(400);
        req.flash("error", "Can't change password.");
        res.redirect(`/users/${routes.changePassword}`);
    }
}