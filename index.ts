import express from 'express';
import * as path from 'path';

const app = express();
const PORT = process.env.PORT || 3080;

// Check if the request made from Secure (HTTPS) url - if not, it redirect the client browser to HTTPS !
app.use(function (req, resp, next) {
  if (req.headers['x-forwarded-proto'] == 'http') {
      return resp.redirect(301, 'https://' + req.headers.host + '/');
  } else {
      return next();
  }
});

// Add this line after we have the build ----->>>>>
app.use(express.static(path.join(__dirname, "build")));

// Redirect all unknown urls back to main page !
app.get('*', function (req, res) {
  res.redirect("/index.html");
  // res.send("We are Running !"); // FOR TESTING WHILE WORKING ON BACK-END
});

// Start server listening
app.listen(PORT, () => {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log(`We are running at http://localhost:${PORT} !`);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
});

