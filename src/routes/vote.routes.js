import { Router } from 'express';
import {
    castVote,
    getAllVotes,
    generateStatistics
} from '../controllers/vote.controller.js';

const router = Router();

router.post('/votes', castVote);
router.get('/votes', getAllVotes);
router.get('/votes/statistics', generateStatistics);

export default router;