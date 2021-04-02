import dbConnect from '../../utils/dbConnect';
import User from '../../models/user';

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      // Find by ID
      if (query.id || query._id) {
        try {
          const id = query.id || query._id;
          const user = await User.findOne({ _id: id });
          res.status(200).json({ success: true, data: user });
        } catch (err) {
          res.status(400).json({ success: false });
        }
        return;
      }
      // Find by email
      if (query.email) {
        try {
          const user = await User.findOne({ email: query.email });
          res.status(200).json({ success: true, data: user });
        } catch (err) {
          res.status(400).json({ success: false, error: err });
        }
        return;
      }
      // Get all
      // Used by default
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (err) {
        res
          .status(400)
          .json({ success: false, message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
