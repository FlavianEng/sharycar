import dbConnect from '../../utils/dbConnect';
import Address from '../../models/address';

export default async function handler(req, res) {
  const { method, query } = req;

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
        const address = await Address.create(req.body);
        res.status(201).json({ success: true, data: address });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case 'DELETE':
      try {
        await Address.deleteOne(req.query.addressId);
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    default:
      res
        .status(400)
        .json({ success: false, message: 'Method not handled' });
      break;
  }
}
