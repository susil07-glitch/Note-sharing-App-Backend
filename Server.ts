import envConfig from "./src/Config/config";
import connectToDatabase from "./src/Config/db";
import express from "express";
import noteRoute from "./src/note/noteRoutes";
import globalErrorHndling from "./src/MiddleWares/globalErrorHandling";
const app = express();
//middleware
app.use(express.json());
app.use(globalErrorHndling);

//database call
connectToDatabase();

//api route
app.use("/api/notes", noteRoute);
app.use("/api/notes",noteRoute);
app.use("/api/notes",noteRoute);
app.use("/api/notes",noteRoute);



 // api route for testing 
const port = envConfig.port || 3000;
app.listen(port, () => {
  console.log(`Server is runnig on port ${port}`);
});
