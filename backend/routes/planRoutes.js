import express from 'express';
import { createPlan, deletePlan, getAllPlans, getPlanByDate, updatePlan, calculatePlan } from '../controllers/planController.js';

const planRouter = express.Router();

planRouter.post('/create', createPlan);
planRouter.delete('/delete/:planId', deletePlan);
planRouter.get('/all/:userId', getAllPlans);
planRouter.get('/date/:date', getPlanByDate);
planRouter.put('/update/:planId', updatePlan);
planRouter.post('/calculate', calculatePlan);

export default planRouter;