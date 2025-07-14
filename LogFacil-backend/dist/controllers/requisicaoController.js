"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRequisicoes = void 0;
const prisma_1 = require("../lib/prisma"); // <-- MUDANÇA IMPORTANTE AQUI
const getAllRequisicoes = async (req, res) => {
    try {
        const requisicoes = await prisma_1.prisma.requisicao.findMany({
            orderBy: { data_cadastro_requisicao: 'desc' }
        });
        res.json(requisicoes);
    }
    catch (error) {
        console.error("Erro ao buscar requisições:", error);
        res.status(500).json({ message: "Erro ao buscar requisições." });
    }
};
exports.getAllRequisicoes = getAllRequisicoes;
