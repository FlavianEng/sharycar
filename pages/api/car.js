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
      // Find active car by driverId with driver informations
      if (query.withDriver === 'true' && query.driver) {
        try {
          const car = await Car.findOne({
            driverId: query.driver,
            isActive: true,
          }).populate('driverId');
          res.status(200).json({ success: true, data: car });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find car by car Id
      if (query.id) {
        try {
          const car = await Car.findById(query.id);
          res.status(200).json({ success: true, data: car });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find active car by driverId
      if (query.driver) {
        try {
          const car = await Car.findOne({
            driverId: query.driver,
            isActive: true,
          });
          res.status(200).json({ success: true, data: car });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find all cars
      try {
        const cars = await Car.find({});
        res.status(200).json({ success: true, data: cars });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const car = await Car.create(body);
        res.status(201).json({ success: true, data: car });
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
