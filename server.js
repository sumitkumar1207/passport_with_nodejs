const express = require('express');

//Initialize app to express
const app = express();

//Creating port
const PORT = process.env.PORT || 5505;

app.listen(PORT, console.log(`Server is started on port ${PORT}`));