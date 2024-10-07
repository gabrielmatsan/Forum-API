import type { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerRequest {
  authorId: string
  answerId: string
  description: string
}

interface EditAnswerResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    description,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }
    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    answer.description = description

    await this.answersRepository.update(answer)

    return { answer }
  }
}
