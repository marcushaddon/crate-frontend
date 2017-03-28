var weOutHere = window.location.href.indexOf('local') < 0;

var angularConfig = {
  // Variable (change for web deployment)
  context: "web", // 'web' | 'extension',
  environment: weOutHere ? "heroku" : "localhost", // 'heroku' | 'localhost'


  // Constant
  localhost: "http://localhost:3000",
  heroku: "http://www.mycrate.io"
};
