/* eslint-disable no-unreachable */
import dbConnect from '../../utils/dbConnect';
import Company from '../../models/company';

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      if (query.companyCode && query.companyCode === 'all') {
        try {
          const company = await Company.find(
            {},
            { _id: 0, companyCode: 1 }
          );
          res.status(200).json({ success: true, data: company });
        } catch (error) {
          res.status(400).json({ success: false, error });
        }
        return;
      }
      if (query.companyCode) {
        try {
          const company = await Company.findOne({
            companyCode: query.companyCode,
          });
          res.status(200).json({ success: true, data: company });
        } catch (error) {
          res.status(400).json({ success: false, error });
        }
        return;
      }
      try {
        const companies = await Company.find({});
        res.status(200).json({ success: true, data: companies });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const company = await Company.create(req.body);
        res.status(201).json({ success: true, data: company });
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