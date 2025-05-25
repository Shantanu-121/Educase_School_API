const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database !");
});

app.get("/", (req, res) => {
  return res.json(
    "DB is connected, please use postman to hit the defined API end points."
  );
});

app.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All credentials ain't provided." });
  }

  if (
    typeof name !== "string" ||
    typeof address !== "string" ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({
      error: "The data types provided of the given inputs ain't valid.",
    });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      message: "School added successfully",
    });
  });
});

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

app.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({
      error: "All credentials ain't provided.",
    });
  }
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    res.status(400).json({
      error: "The datatypes of the given credentials is not valid.",
    });
  }
  const query = "SELECT * FROM schools";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: "Database related error.",
      });
    }
    const allSchools = result;
    allSchools.map((school) => {
      school.difference = haversineDistance(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      );
    });

    allSchools.sort(
      (school1, school2) => school1.difference - school2.difference
    );
    return res.json(allSchools);
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});
