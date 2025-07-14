import { Router } from 'express';
import { getAllRequisicoes } from '../controllers/requisicaoController';

const router = Router();

// Esta rota agora será protegida pelo middleware no server.ts
router.get('/', getAllRequisicoes);

export default router;