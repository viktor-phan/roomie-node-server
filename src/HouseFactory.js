import faker from "faker";

import House from "./models/House/index.js";
import connectDatabase from "./database/index.js";

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createFakeHouse = async () => {
  let sample = faker.helpers.createCard();
  let data = {
    address1: sample.address.streetB,
    city: sample.address.city,
    state: sample.address.state,
    zip: sample.address.zipcode.substring(0, 5),
    squareFeet: getRandom(1200, 3000),
    capacity: getRandom(1, 4),
    room: getRandom(1, 3),
    privateBathroom: Boolean(getRandom(0, 2)),
    kitchen: Boolean(getRandom(0, 2)),
    laundry: Boolean(getRandom(0, 2)),
    wifi: Boolean(getRandom(0, 2)),
    description: sample.posts[0].sentences,
    heater: Boolean(getRandom(0, 2)),
    monthlyFee: getRandom(800, 2500),
  };
  let newHouse = new House(data);
  try {
    let savedHouse = await newHouse.save();
    console.log(savedHouse);
  } catch (error) {
    console.log(error);
  }
};

const runFactory = async () => {
  const time = process.argv[2] ? process.argv[2] : 1;
  await connectDatabase();
  for (let index = 0; index < time; index++) {
    await createFakeHouse();
  }
  await process.exit(0);
};

runFactory();
