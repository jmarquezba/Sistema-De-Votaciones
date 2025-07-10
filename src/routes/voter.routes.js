import { Router } from 'express';
import {
    getAllVoters,
    getVoterById,
    deleteVoter,
    registerVoter
} from '../controllers/voter.controller.js';

const router = Router();

router.post('/voters', registerVoter);
router.get('/voters', getAllVoters);
router.get('/voters/:id', getVoterById);
router.delete('/voters/:id', deleteVoter);

export default router;