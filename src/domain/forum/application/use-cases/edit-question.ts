import type { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionRequest {
  authorId: string
  questionId: string
  title: string
  description: string
}

interface EditQuestionResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    description,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionsRepository.findByID(questionId)

    if (!question) {
      throw new Error('Question not found')
    }
    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.description = description

    await this.questionsRepository.update(question)

    return { question }
  }
}
