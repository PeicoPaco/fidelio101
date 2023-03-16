const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const exampleRoutes = require("./routes/example-routes");
const userRoutes = require("./routes/user-routes");
const dishRoutes = require("./routes/dish-routes");
const categoryRoutes = require("./routes/category-routes");
const clientsRoutes = require("./routes/clients-routes");
const staffRoutes = require("./routes/staff-routes");
const localRoutes = require("./routes/local-routes");
const labelRoutes = require("./routes/label-routes");
const profilesRoutes = require("./routes/profiles-routes");
const staffFidelioRoutes = require("./routes/staffFidelio-routes");
const locationRoutes = require("./routes/location-routes");
const openpayRoutes = require("./openpay/routes-openpay/openpay-routes");
const middleware = require('./middleware/index-middleware');

const app = express();

app.use(cors(
   {
      origin: true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(middleware.decodeToken);


app.get('/test', (req, res)  => {
   res.send('El servidor de Fidelio está funcionando')
});
app.use("/api", exampleRoutes.routes)
app.use("/api", userRoutes.routes)
app.use("/api", dishRoutes.routes)
app.use("/api", categoryRoutes.routes)
app.use("/api", clientsRoutes.routes)
app.use("/api", staffRoutes.routes)
app.use("/api", localRoutes.routes)
app.use("/api", labelRoutes.routes)
app.use("/api", profilesRoutes.routes)
app.use("/api", staffFidelioRoutes.routes)
app.use("/api", staffFidelioRoutes.routes)
app.use("/api", locationRoutes.routes)
app.use("/openpay", openpayRoutes.routes)


exports.app = functions.https.onRequest(app)