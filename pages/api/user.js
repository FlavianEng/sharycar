/* eslint-disable no-unused-vars */
import dbConnect from '../../utils/dbConnect';
import User from '../../models/user';
import Address from '../../models/address';
import dayjs from 'dayjs';

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      // Find by ID
      if (query.id || query._id) {
        try {
          const id = query.id || query._id;
          const user = await User.findOne({ _id: id }).populate(
            'addressId'
          );
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
      const {
        companyId,
        id,
        address,
        direction,
        phone,
        birthday,
      } = body;

      if (birthday) {
        try {
          const user = await User.updateOne(
            { _id: id },
            { birthday: dayjs(birthday).toISOString() }
          );

          res.status(200).json({ success: true, data: user });
        } catch (err) {
          res
            .status(400)
            .json({ success: false, message: err.message });
        }
        return;
      }

      if (phone) {
        try {
          const user = await User.updateOne(
            { _id: id },
            { phoneNumber: phone }
          );

          res.status(200).json({ success: true, data: user });
        } catch (err) {
          res
            .status(400)
            .json({ success: false, message: err.message });
        }
        return;
      }

      if (companyId) {
        try {
          const user = await User.updateOne(
            { _id: id },
            { $set: { companyId: companyId } }
          );

          res.status(200).json({ success: true, data: user });
        } catch (err) {
          res
            .status(400)
            .json({ success: false, message: err.message });
        }
        return;
      }

      if (address) {
        try {
          if (direction === 'add') {
            const user = await User.updateOne(
              { _id: id },
              { $push: { addressId: address } }
            );

            res.status(200).json({ success: true, data: user });
          }
          if (direction === 'remove') {
            const user = await User.updateOne(
              { _id: id },
              { $pull: { addressId: address } }
            );

            res.status(200).json({ success: true, data: user });
          }
        } catch (err) {
          res
            .status(400)
            .json({ success: false, message: err.message });
        }
        return;
      }
      res.status(400).json({ success: false });
      break;

    case 'DELETE':
      try {
        const user = await User.deleteOne({ _id: query.id });

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
