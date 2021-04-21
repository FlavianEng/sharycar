/* eslint-disable no-unused-vars */
import dbConnect from '../../utils/dbConnect';
import User from '../../models/user';
import Address from '../../models/address';

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
          res
            .status(400)
            .json({ success: false, message: err.message });
        }
        return;
      }

      // Find by email
      if (query.email) {
        try {
          const user = await User.findOne({
            email: query.email,
          })
            .populate('addressId')
            .populate('companyId');
          res.status(200).json({ success: true, data: user });
        } catch (err) {
          res
            .status(400)
            .json({ success: false, message: err.message });
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
    case 'PUT':
      try {
        const user = await User.updateOne(
          { _id: req.body.id },
          { $set: { companyId: req.body.companyId } }
        );

        res.status(200).json({ success: true, data: user });
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
