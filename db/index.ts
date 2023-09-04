import mongoose from 'mongoose';
import Account from '../models/account.model';
import Behavior from '../models/behavior.model';
import {logService} from "../services";

mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : "").then(e =>
    logService.trace(e)
).catch((err)=>{
    logService.error(err)
});
mongoose.Promise = global.Promise;

export default {
    Account,
    Behavior
};
