import { Router } from 'express';
import {
    getAllCandidates,
    getCandidateById,
    deleteCandidate,
    registerCandidate
} from '../controllers/candidate.controller.js';

const router = Router();

router.post('/candidates', registerCandidate);
router.get('/candidates', getAllCandidates);
router.get('/candidates/:id', getCandidateById);
router.delete('/candidates/:id', deleteCandidate);

export default router;