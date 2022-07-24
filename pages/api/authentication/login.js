import dbConnect from "../../../lib/mongodb";
import { withSessionRoute } from "../../../lib/session";
import User from "../../../models/user";

async function Login(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
          return res
            .status(400)
            .json({ success: false, message: "User not found" });
        const match = user.validatePassword(req.body.password);
        if (!match)
          return res
            .status(403)
            .json({ success: false, message: "Invalid password" });

        const session_user = {
          id: user._id,
          isLoggedIn: true,
          infos: {
            name: user.firstName +' '+ user.lastName,
            email: user.email,
            role: user.role,
          },
        };

        req.session.user = session_user;
        await req.session.save();
        res.status(200).json({success: true, data: session_user});

      } catch (error) {
        console.log(error.message)
        res.status(500).json({success: true});
      }
      break;
    default:
      res.status(400).json({success: true, message: "Only post request are supported" });
      break;
  }
}

export default withSessionRoute(Login);
