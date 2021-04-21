/* eslint-disable no-unused-vars */
import dbConnect from '../../utils/dbConnect';
import mongoose from 'mongoose';
import Journey from '../../models/journey';
import Car from '../../models/car';
import Address from '../../models/address';
import User from '../../models/user';
import dayjs from 'dayjs';

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      // Find journeys by driver with driver informations
      if (query.driver && query.withDriver === 'true') {
        try {
          const journeys = await Journey.find({
            driverId: query.driver,
          }).populate('driverId');
          res.status(200).json({ success: true, data: journeys });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find journeys by car with car informations
      if (query.car && query.withCar === 'true') {
        try {
          const journeys = await Journey.find({
            carId: query.car,
          }).populate('carId');
          res.status(200).json({ success: true, data: journeys });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find journeys by driver with all informations
      if (query.driver && query.withInformations === 'true') {
        try {
          const journeys = await Journey.find({
            driverId: query.driver,
          })
            .populate('driverId')
            .populate('carId')
            .populate('departure')
            .populate('destination')
            .populate('passengers');
          res.status(200).json({ success: true, data: journeys });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find journeys by car Id
      if (query.car) {
        try {
          const journeys = await Journey.find({ carId: query.car });
          res.status(200).json({ success: true, data: journeys });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find journeys by time of departure that are not from the userId
      // Remove journeys with no available seats
      if (query.timeOfDeparture && query.driverId) {
        try {
          const { timeOfDeparture, driverId } = query;

          const journeys = await Journey.find({
            timeOfDeparture: {
              $gte: dayjs(timeOfDeparture),
              $lte: dayjs(timeOfDeparture).add(1, 'day'),
            },
            driverId: {
              $ne: driverId,
            },
            $expr: {
              $lt: [{ $size: '$passengers' }, '$maxPassengers'],
            },
          })
            .populate('driverId', ['firstName', 'lastName'])
            .populate('departure')
            .populate('destination');

          res.status(200).json({ success: true, data: journeys });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find journeys by driver Id
      if (query.driver) {
        try {
          const journeys = await Journey.find({
            driverId: query.driver,
          });
          res.status(200).json({ success: true, data: journeys });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find journey by id
      if (query.id) {
        try {
          const journey = await Journey.findById(query.id);
          res.status(200).json({ success: true, data: journey });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Find all journeys
      try {
        const journeys = await Journey.find({});
        res.status(200).json({ success: true, data: journeys });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const journey = await Journey.create(body);
        res.status(201).json({ success: true, data: journey });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: error.message });
      }
      break;

    // Update passengers of the journey by journey Id
    case 'PUT':
      try {
        const { id, newPassenger } = req.body;
        const journey = await Journey.updateOne(
          { _id: id },
          { $push: { passengers: newPassenger } }
        );

        res.status(200).json({ success: true, data: journey });
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
