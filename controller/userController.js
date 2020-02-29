import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
}

export const postJoin = (req, res) => {
    const {
            body: { name, email, password, password2}
        } = req;
    
    if (password !== password2) {
        res.status(400);
    } else {
        // TODO : register User
        // TODO : log User In
        res.redirect(routes.home)
    }
    //res.render("join", { pageTitle: "Join" });
}


export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });

export const postLogin = (req, res) => {
    const {
        body: { email, password }
    } = req;

    // TODO : check loing info
    if (false) {
        res.status(400);
    } else {
        // TODO : log User In
        res.redirect(routes.home)
    }
    //res.render("login", { pageTitle: "Log In" });
}

export const logout = (req, res) => {
    //res.render("logout", { pageTitle: "Log Out" });
    
    // TODO : Process Logout
    res.redirect(routes.home)
}

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });