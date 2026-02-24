import express from 'express';
import globalErrorHndling from './MiddleWares/globalErrorHandling';
import noteRoute from './note/noteRoutes';


const app = express();

app.use("/api/notes",noteRoute)
app.use(globalErrorHndling)


export default app 
