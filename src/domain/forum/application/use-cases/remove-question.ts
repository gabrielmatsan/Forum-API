import { QuestionsRepository } from '../repositories/questions-repository'

interface RemoveQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

interface RemoveQuestionUseCaseResponse {}

export class RemoveQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: RemoveQuestionUseCaseRequest): Promise<RemoveQuestionUseCaseResponse | void> {
    const question = await this.questionsRepository.findByID(questionId)

    if (!question) throw new Error('Question not found')

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed to remove')
    }
    await this.questionsRepository.delete(question)

    return {}
  }
}
