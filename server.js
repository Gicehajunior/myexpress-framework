require('module-alias/register');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('./config/config');
const database = require('./config/database');
const routes = require("./routes/app");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
if (config.APP.APP_DEBUG) {
    app.use(morgan('dev'));
}

// Serve Public Assets
app.use(express.static(config.PATHS.PUBLIC));

const viewBase = config.PATHS.VIEWS
const viewFolders = fs.readdirSync(viewBase).map(folder => path.join(viewBase, folder));

app.set("views", [viewBase, ...viewFolders]);
app.set('view engine', config.VIEW_ENGINE);

// Load Routes
app.use(routes);

// Start Server only if DB is ready
(async () => {
  await database.init(); 
  app.listen(config.APP.APP_PORT, () => {
    console.log(`Server running at ${config.APP.APP_PORT}`);
  });
})();
