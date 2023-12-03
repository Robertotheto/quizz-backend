import { Request, Response } from "express";
import { prisma } from "../../database/prisma";

export const submitAnswers = async (request: Request, response: Response) => {

  const { userId, answers } = request.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return response.status(404).json({ error: 'Usuário não encontrado.' });
    }

    let correctAnswersCount = 0;

    for (const userAnswer of answers) {
      const { questionId, answerId } = userAnswer;

      const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: { answers: true },
      });

      if (!question) {
        return response.status(404).json({ error: `Pergunta com ID ${questionId} não encontrada.` });
      }

      const selectedAnswer = question.answers.find((a) => a.id === answerId);

      if (!selectedAnswer) {
        return response.status(404).json({ error: `Resposta com ID ${answerId} não encontrada.` });
      }

      if (selectedAnswer.isCorrect) {
        correctAnswersCount += 1;
      }
    }

    return response.status(200).json({ correctAnswersCount });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Erro ao processar respostas do usuário.' });
  }
};
