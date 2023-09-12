import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    username: {type: String, unique: true, required: true},
    github_id: {type: Number},
    google_id: {type: Number},
    email: {type: String, unique: true},
    avatar: {type: String},
    github_url: {type: String},
    created: {type: Date, default: Date.now}
});

schema.index(
    {google_id: 1, github_id: 1},
    {
        partialFilterExpression:
            {$or: [{google_id: {$exists: true}}, {github_id: {$exists: true}}]},
        unique: true
    }
)

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

// prevent model overwrite during hot module replacement
export default mongoose.models['Account'] || mongoose.model('Account', schema);
