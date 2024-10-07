import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'
import { right, Either } from '@/core/either'

interface CreateQuestionRequestion {
  authorId: string
  title: string
  description: string
}

type CreateQuestionResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    description,
  }: CreateQuestionRequestion): Promise<CreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      description,
    })

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
