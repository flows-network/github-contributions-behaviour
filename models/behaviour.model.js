import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    funcsId: {type: String, unique: true, required: true},
    creator: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    template: {type: Schema.Types.ObjectId, ref: 'Template'},
    tags: {type: Array},
    created: {type: Date, default: Date.now},
    status: {type: String, required: true, default: FlowStatus.Init}
});

schema.index(
    {name: 1, creator: 1},
    {collation: {locale: 'en', strength: 2}, unique: true} // case insensitive using collation
);

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

// prevent model overwrite during hot module replacement
export default mongoose.models['Behaviour'] || mongoose.model('Behaviour', schema, 'gcb');
