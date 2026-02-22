import app from './src/app'
import envConfig from './src/Config/config';
import connectToDatabase from './src/Config/db';



const startServer = () => {
    const port = envConfig.port || 3000;
    app.listen(port, () => {
        console.log(`Server is runnig on port ${port}`);

    });
};

startServer();
connectToDatabase();
