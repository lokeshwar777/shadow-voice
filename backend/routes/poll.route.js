import { Router } from 'express';
import {
    createPoll,
    deletePoll,
    getPollById,
    getPolls,
    votePoll,
} from '../controllers/poll.controller.js';

const router = Router();

router.post('/', createPoll);
router.get('/', getPolls);
router.get('/:id', getPollById);
router.post('/:id/vote', votePoll);
router.delete('/:id', deletePoll);

export default router;
