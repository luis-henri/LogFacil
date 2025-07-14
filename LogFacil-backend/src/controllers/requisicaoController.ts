import { Request, Response } from 'express';
import { prisma } from '../lib/prisma'; // <-- MUDANÇA IMPORTANTE AQUI

export const getAllRequisicoes = async (req: Request, res: Response): Promise<void> => {
    try {
        const requisicoes = await prisma.requisicao.findMany({
            orderBy: { data_cadastro_requisicao: 'desc' }
        });
        res.json(requisicoes);
    } catch (error) {
        console.error("Erro ao buscar requisições:", error);
        res.status(500).json({ message: "Erro ao buscar requisições." });
    }
};