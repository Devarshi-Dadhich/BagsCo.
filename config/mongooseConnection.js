import mongoose from 'mongoose';
import debug from 'debug';

import config from 'config';

const log = debug('app:mongoose');

mongoose.connect(`${config.get('MONGO_URI')}/Scatch`)
.then(()=>{
    log("connected");
})
.catch((err)=>{
    log(err);
})
export default mongoose.connection;
// This file establishes a connection to the MongoDB database using Mongoose. 