import mongoose from 'mongoose';
import debug from 'debug';

import config from 'config';

const log = debug('app:mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    log("connected");
})
.catch((err)=>{
    log(err);
})
export default mongoose.connection;
// This file establishes a connection to the MongoDB database using Mongoose. 