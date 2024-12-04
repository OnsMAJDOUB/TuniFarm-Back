const express = require("express");

const app = express();

app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 7000;

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`⚡⚡⚡ Server is running on http://127.0.0.1:${PORT}`);
});

const connectDB = require("./config/connectDB");

connectDB();
app.use((req,res)=>{
  res.send("API is running")
})

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
