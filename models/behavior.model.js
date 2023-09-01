import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    githubId: {type: String, required: true},
    owner: {type: String, required: true},
    repo: {type: String, required: true},
    data:{type: String, required: true},
    // creator: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    created: {type: Date, default: Date.now}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

// prevent model overwrite during hot module replacement
export default mongoose.models['Behavior'] || mongoose.model('Behavior', schema);
