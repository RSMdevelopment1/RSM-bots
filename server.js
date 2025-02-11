const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Bot is alive!");
});

// Changed port from 3000 to 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
