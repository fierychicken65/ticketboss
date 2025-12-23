const express = require("express");
const seedEvent = require("./db/seedEvent");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

const PORT = 3000;

async function startServer(){
    await seedEvent();
    app.listen(PORT, () => {
        console.log(`Ticketboss running on port ${PORT}`);
    });
}

startServer();
