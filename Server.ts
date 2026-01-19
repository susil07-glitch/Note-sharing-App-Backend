import app from './src/app.ts';
import dotenv from 'dotenv';

dotenv.config();

const Port = process.env.PORT || 3000;

const startServer = () => {
    app.listen(Port, () => {
        console.log('server is running smoothly');
    });
};

startServer();