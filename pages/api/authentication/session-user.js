import { withSessionRoute } from "../../../lib/session";

export default withSessionRoute(User)

async function User(req, res) {
    if (req.session.user) {
        const resul = {
            ...req.session.user,
            isLoggedIn: true
        }
        res.json(resul)
    }
    else {
        const resul = {
            isLoggedIn: false
        }
        res.json(resul)
    }
}