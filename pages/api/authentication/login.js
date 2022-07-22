import { compare } from "bcrypt"
import clientPromise from "../../../lib/mongodb"
import { withSessionRoute } from "../../../lib/session"


async function Login(req, res) {
    try {

        // On considère que la forme de la requête est déjà validé
        // car cette api n'a pas d'usage externe de prévu.

        const client = await clientPromise
        const db = client.db('userdb')

        const users = db.collection('users')
        const roles = db.collection('roles')

        if (req.method === "POST") {

            const user = await users.findOne({ email: req.body.email })
            if (!user) return res.status(403).send({ message: "Please check your email and password." })

            const match = await compare(req.body.password, user.password)
            if (!match) return res.status(403).send({ message: "Please check your email and password." })

            const user_role = await roles.findOne({_id: user.roleId})

            const session_user = {
                id: user._id,
                isLoggedIn: true,
                infos:{
                    name: user.name,
                    email: user.email,
                    role: user_role.name
                }
            }

            req.session.user = session_user
            await req.session.save()
            
            res.send({ session_user }) // just for test
            res.status(200).end()
        }
        else
            res.status(405).json({ message: "only post request are supported" }).end()


    } catch (error) {
        const message = ` Something went wrong : ${error}`
        console.error('[Auth Api]', message)
        res.status(500).json({ message: message })
    }
}


export default withSessionRoute(Login)