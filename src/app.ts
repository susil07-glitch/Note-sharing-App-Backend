import express from 'express';
import globalErrorHndling from './MiddleWares/globalErrorHandling';
import noteRoute from './note/noteRoutes';


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/notes",noteRoute)
app.use(express.static("./src/uploads"))
app.use(globalErrorHndling)


export default app 
