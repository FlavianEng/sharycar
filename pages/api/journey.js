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
      // Finds all not began journeys of human (driver or passenger)
      // With informations
      // Verify if not in began
      const { user, withInformations } = query;
      if (user) {
        try {
          if (withInformations === 'true') {
            const journeys = await Journey.find({
              timeOfDeparture: {
                $gt: dayjs().toISOString(),
              },
            })
              .or([
                { passengers: query.user },
                { driverId: query.user },
              ])
              .populate('driverId')
              .populate('carId')
              .populate('departure')
              .populate('destination')
              .populate('passengers');

            res.status(200).json({ success: true, data: journeys });
          } else {
            const journeys = await Journey.find({
              timeOfDeparture: {
                $gt: dayjs().toISOString(),
              },
            }).or([
              { passengers: query.user },
              { driverId: query.user },
            ]);

            res.status(200).json({ success: true, data: journeys });
          }
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: error.message });
        }
        return;
      }

      // Finds journeys by driver with driver informations
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

      // Finds journeys by car with car informations
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

      // Finds journeys by driver with all informations
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

      // Finds journeys by car Id
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

      // Finds journeys by time of departure that are not from the userId
      // Removes journeys with no available seats
      if (query.timeOfDeparture && query.userId) {
        try {
          const { timeOfDeparture, userId } = query;

          const journeys = await Journey.find({
            timeOfDeparture: {
              $gt: dayjs(timeOfDeparture),
              $lte: dayjs(timeOfDeparture).add(2, 'day'),
            },
            driverId: {
              $ne: userId,
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

      // Finds journeys by driver Id
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

      // Finds journey by id
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

      // Finds all journeys
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

    // Updates passengers of the journey by journey Id
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

    case 'DELETE':
      try {
        const { id } = query;
        const journey = await Journey.deleteOne({ _id: id });

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
