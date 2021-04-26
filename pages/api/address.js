/* eslint-disable no-unused-vars */
import dbConnect from '../../utils/dbConnect';
import User from '../../models/user';
import Address from '../../models/address';
import Company from '../../models/company';
import Journey from '../../models/journey';
import Car from '../../models/car';

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const addresses = await Address.find({});
        res.status(200).json({ success: true, data: addresses });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const address = await Address.create(body);
        res.status(201).json({ success: true, data: address });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      try {
        await Address.deleteOne({ _id: query.addressId });
        res.status(201).json({ success: true });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: error.message });
      }
      break;

    default:
      res
        .status(400)
        .json({ success: false, message: 'Method not handled' });
      break;
  }
}
