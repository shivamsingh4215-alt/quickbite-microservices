import { ObjectId } from "mongodb";
import TryCatch from "../middlewares/trycatch.js";
import {
  getRestaurantCollection,
  getRiderCollection,
} from "../util/collection.js";

export const getPendingRestaurant = TryCatch(async (require, res) => {
  const restaurants = await (await getRestaurantCollection())
    .find({ isVerified: false })
    .toArray();

  res.json({
    count: restaurants.length,
    restaurants,
  });
});

export const getPendingRiders = TryCatch(async (require, res) => {
  const riders = await (await getRiderCollection())
    .find({ isVerified: false })
    .toArray();

  res.json({
    count: riders.length,
    riders,
  });
});


export const verifyRestaurant = TryCatch(async (require, res) => {
  const { id } = require.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "invalid restaurant id",
    });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "invalid object id",
    });
  }

  const result = await (
    await getRestaurantCollection()
  ).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        isVerified: true,
        updatedAt: new Date(),
      },
    },
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({
      message: "Restaurant not found",
    });
  }

  res.status(400).json({
    message: "Restaurant verified successfully",
  });
});

export const verifyRider = TryCatch(async (require, res) => {
  const { id } = require.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "invalid rider id",
    });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "invalid object id",
    });
  }

  const result = await (
    await getRiderCollection()
  ).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        isVerified: true,
        updatedAt: new Date(),
      },
    },
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({
      message: "Rider not found",
    });
  }

  res.status(400).json({
    message: "Rider verified successfully",
  });
});