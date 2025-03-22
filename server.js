/**
 * MyExpress Framework - Lightweight MVC Web Framework for Node.js
 * ---------------------------------------------------------------
 * Designed and Developed by Giceha Junior
 * GitHub: https://github.com/Gicehajunior
 * 
 * MyExpress is a minimal yet powerful Node.js framework built on 
 * Express, following the MVC architecture for better code organization. 
 * It is designed to be modular, scalable, and developer-friendly.
 * 
 * Features:
 * - Modular structure with alias support
 * - Secure HTTP headers using Helmet
 * - CORS enabled for cross-origin requests
 * - Logging with Morgan in debug mode
 * - Automatic view directory configuration
 * - Express-based routing with centralized route handling
 * - Easy database initialization
 * 
 * Ensure that the configuration files are properly set before starting.
 */
require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('@config/config');
const corsconfig = require('@config/cors');
const database = require('@config/database');
const routes = require("@routes/app"); 
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: corsconfig.ORIGIN,
  credentials: corsconfig.CREDENTIALS
}));
app.use(helmet());
if (config.APP.APP_DEBUG) {
    app.use(morgan('dev'));
}

// session setup
app.use(session({
  name: config.SESSION.SESSION_NAME || 'connect.sid',
  secret: config.APP.SESSION_SECRET,
  resave: config.SESSION.RESAVE,
  saveUninitialized: true,
  proxy: config.SESSION.PROXY,
  cookie: {
    secure: config.COOKIES.SECURE,
    httpOnly: config.COOKIES.HTTPONLY,
    sameSite: config.COOKIES.SAMESITE,
    path: config.COOKIES.PATH,
    maxAge: config.COOKIES.MAXAGE,
  }
}));

if (config.COOKIES.REFRESH) {
  // Refresh the session expiration each time the user interacts with the 
  // application
  app.use((req, res, next) => {
    if (req.session) {
      req.session.cookie.maxAge = config.COOKIES.MAXAGE;
    }
    next();
  });
}

// Use flash session library
// On the side, make the session flash usable on 
// views as well.
app.use(flash()); 
app.use((req, res, next) => {
  res.locals.status = req.flash('status');
  res.locals.message = req.flash('message');
  next();
});

// Serve Public Assets 
app.use(express.static(config.PATHS.PUBLIC, {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.use((req, res, next) => {
  Object.entries(config.REQUESTS.ALLOW_HEADERS_LIST).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
});

const getAllDirectories = (dirPath) => {
  let results = [dirPath];
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      if (item.isDirectory()) {
          results = results.concat(getAllDirectories(fullPath)); // Recursively get subdirectories
      }
  }

  return results;
};

const viewBase = config.PATHS.VIEWS;
const viewFolders = getAllDirectories(viewBase);

app.set("views", viewFolders);
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
