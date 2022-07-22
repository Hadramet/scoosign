import { withSessionRoute }  from "../../../lib/session";

export default withSessionRoute(Logout)

async function Logout(req, res)  {
    req.session.destroy();
    res.json({ isLoggedIn: false});
}