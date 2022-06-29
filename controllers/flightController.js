const flights = require("../models/Flight");

//book or add flight
exports.postFlight = (req, res) => {
  console.log("booking flight...");

  const newFlight = {
    id: getID(),
    title: req.body.title,
    time: req.body.time,
    price: getPrice(),
    date: req.body.date,
  };

  if (!newFlight.title || !newFlight.time || !newFlight.date) {
    return res
      .status(400)
      .json({ message: "Please include title, time and date" });
  }

  flights.push(newFlight);

  res.json(flights);
};

//get all flights
exports.getAllFlights = (req, res) => {
  res.json(flights);
  console.log("getting all flights...");
};

//get a single flight
exports.getSingleFlight = (req, res) => {
  console.log(`getting flight with id of ${req.params.id}...`);
  const found = flights.some((flight) => flight.id === +req.params.id);

  if (found) {
    res.json(flights.filter((flight) => flight.id === +req.params.id));
  } else {
    res
      .status(400)
      .json({ message: `no flight with the id of ${req.params.id}` });
  }
};

//update flight
exports.putFlight = (req, res) => {
  console.log(`updating flight with id of ${req.params.id}...`);
  const found = flights.some((flight) => flight.id === +req.params.id);

  if (found) {
    const updateFlight = req.body;
    flights.forEach((flight) => {
      if (flight.id === +req.params.id) {
        flight.title = updateFlight.title ? updateFlight.title : flight.title;
        flight.time = updateFlight.time ? updateFlight.time : flight.time;
        flight.date = updateFlight.date ? updateFlight.date : flight.date;
        flight.price = getPrice();

        res.json({
          message: `updated flight with the id of ${req.params.id}`,
          flights: flights,
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: `no flight with the id of ${req.params.id}` });
  }
};

//delete flight
exports.deleteFlight = (req, res) => {
  console.log(`deleting flight with id of ${req.params.id}...`);
  const found = flights.some((flight) => flight.id === +req.params.id);

  if (found) {
    res.json({
      message: `deleted flight with the id of ${req.params.id}`,
      flights: flights.filter((flight) => flight.id !== +req.params.id),
    });
  } else {
    res
      .status(400)
      .json({ message: `no flight with the id of ${req.params.id}` });
  }
};

//generate random prices for flights
function getPrice() {
  return Math.floor(
    Math.random() * (Math.floor(50000) - Math.ceil(10000)) + 10000
  );
}

//generate random id for flights
function getID() {
  return Math.floor(
    Math.random() * (Math.floor(69000) - Math.ceil(23000)) + 23000
  );
}
