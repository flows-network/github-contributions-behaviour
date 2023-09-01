import {default as db} from '@/db';

export default async function handler(req, res) {
    const {behaviorId} = req.query;

    const behavior = await db.Behavior.findById(behaviorId);

    res.end(JSON.stringify({data: behavior}));
}