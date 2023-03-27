import express  from "express" 
import mongoose from "mongoose"
import cors from 'cors'
import cookieParser from "cookie-parser"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import tourRoute from './routes/tours.js'
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/booking.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 8080
const corsOptions = {
  origin : true ,
  credentials : true
}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("Connected !!!")
}).catch(err => { 
  console.log(err);  
});      

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/tours',tourRoute ) ;
app.use('/api/v1/user', userRoute ) ;
app.use('/api/v1/auth', authRoute ) ;
app.use('/api/v1/review', reviewRoute ) ;
app.use('/api/v1/booking', bookingRoute ) ;



app.listen(port , () => {
    console.log('server listening on port' , port )
})