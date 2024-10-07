import { left, right, Either } from '@/core/either'
import type { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditQuestionRequest {
  authorId: string
  questionId: string
  title: string
  description: string
}

type EditQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

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
      return left(new ResourceNotFoundError())
    }
    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.description = description

    await this.questionsRepository.update(question)

    return right({ question })
  }
}
