import dbConnect from "../../../lib/mongodb";
import { withSessionRoute } from "../../../lib/session";
import User from "../../../models/user";

async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email: body.email });
        if (user)
          return res
            .status(400)
            .json({ success: false, message: "User already exist" });
        const new_user = new User(body);
        new_user.setPassword(body.password);
        if (req.session.user) {
          new_user.created_by = req.session.user.id;
        }
        await new_user.save();
        res.status(201).json({ success: true, data: new_user });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
export default withSessionRoute(handler);
