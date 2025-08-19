import express from 'express'
const app = express();
import cors from 'cors'





import Bookrouter from './routes/book.js';
import CartRouter from './routes/Cart.js'
import FavouriteBookRouter from './routes/Favourite.js'
import OrderRouter from './routes/Order.js'
import UserRouter from './routes/User.js'
import ConnectDB from './config/ConnectDB.js';
import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT || 1000;
app.use(cors());
app.use(express.json());

//Calling Routes
app.use("/api/v1", UserRouter);
app.use("/api/v1", Bookrouter);
app.use("/api/v1", CartRouter);
app.use("/api/v1", FavouriteBookRouter);
app.use("/api/v1", OrderRouter);

//SERVER
app.listen(PORT, () => {

  console.log(`Server Started at PORT : ${PORT} `);
    ConnectDB();
});
