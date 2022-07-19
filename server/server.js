const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//define the user route
//define the hike route

const userRoute = require('./routes/userRoute');
const hikeRoute = require('./routes/hikeRoute');

app.use("/api/users", userRoute)
app.use('/api/hikes', hikeRoute)

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  });
};

// app.use((req, res) => res.sendStatus(404)); // catch-all route handler for any requests to an unknown route


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.get('*', (req, res) => {
  console.log("Invalid URL detected");
  res.status(404).json({ error: `Page not found, request to ${req.path} failed` });
});
/**
 * configure express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
 app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred: ' + err }, 
  };
  
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log(errorObj.message);
  
  // return res.send({'Error status': errorObj.status, 'Message': errorObj.message});
  return res.status(errorObj.status).json(errorObj.message)
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
