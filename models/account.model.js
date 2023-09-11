import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    username: {type: String, unique: true, required: true},
    user_id: {type: Number, unique: true},
    email: {type: String, unique: true},
    avatar: {type: String},
    github_url: {type: String},
    created: {type: Date, default: Date.now}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

// prevent model overwrite during hot module replacement
export default mongoose.models['Account'] || mongoose.model('Account', schema);
