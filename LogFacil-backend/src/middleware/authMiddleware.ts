import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Esta declaração global permite adicionar a propriedade 'user' ao objeto Request
declare global {
    namespace Express {
        interface Request {
            user?: { userId: number };
        }
    }
}

// CORREÇÃO: Adicionada a tipagem de retorno explícita ': void' e 'return' nas respostas de erro.
// Isto garante a TypeScript que a função ou chama next() ou termina a execução.
export const protect = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Não autorizado, token não fornecido.' });
        return; // Garante que a função para aqui
    }

    try {
        const token = authHeader.split(' ')[1];
        
        if (!process.env.JWT_SECRET) {
            // Lançar um erro é uma boa prática aqui, pois é um erro de configuração do servidor
            throw new Error('O segredo JWT não está configurado no servidor.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Adiciona os dados decodificados do usuário ao objeto de requisição para uso futuro
        req.user = decoded as { userId: number };

        // Se o token for válido, passa para a próxima função (o controller da rota)
        next();
    } catch (error) {
        console.error('Erro de autenticação:', error);
        res.status(401).json({ message: 'Token inválido ou expirado.' });
        return; // Garante que a função para aqui
    }
};