import {default as db} from '../../db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {behaviorId} = req.query;

    const behavior = await db.Behavior.findById(behaviorId);

    res.end(JSON.stringify({data: behavior}));
}