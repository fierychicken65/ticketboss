const express = require("express");
const seedEvent = require("./db/seedEvent");
const reservationRoutes = require("./routes/reservations");
const debugRoutes = require("./routes/debug");



const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

const PORT = 3000;

async function startServer(){
    await seedEvent();
    app.use("/reservations", reservationRoutes);
    app.use("/debug", debugRoutes);
    app.listen(PORT, () => {
        console.log(`Ticketboss running on port ${PORT}`);
    });
}

startServer();
