import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome User" });
});

// Get all users from userdata.json
app.get("/users", (req, res) => {
  try {
    const data = fs.readFileSync("./userdata.json", "utf-8");
    const users = JSON.parse(data);
    res.status(200).json({ message: "Data Received", userdata: users });
  } catch (err) {
    console.error("Error reading file:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get user by ID
app.get("/user/:id", (req, res) => {
  try {
    const data = fs.readFileSync("./userdata.json", "utf-8");
    const users = JSON.parse(data);
    const id = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Data Received", user });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create new user (persist to userdata.json)
app.post("/create", (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const data = fs.readFileSync("./userdata.json", "utf-8");
    const users = JSON.parse(data);

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
      email,
    };

    users.push(newUser);

    fs.writeFileSync("./userdata.json", JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete user by ID
app.delete("/user/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    let users = JSON.parse(fs.readFileSync("./userdata.json", "utf-8"));

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);

    fs.writeFileSync("./userdata.json", JSON.stringify(users, null, 2));

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update user by ID
app.put("/user/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;

    let users = JSON.parse(fs.readFileSync("./userdata.json", "utf-8"));
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    users[userIndex] = { ...users[userIndex], name, email };

    fs.writeFileSync("./userdata.json", JSON.stringify(users, null, 2));

    res.status(200).json({ message: "User updated successfully", user: users[userIndex] });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log(`File server running on port ${port}`);
});
