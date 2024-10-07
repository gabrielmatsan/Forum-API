import { AnswersRepository } from '../repositories/answers-repository'

interface RemoveAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface RemoveAnswerUseCaseResponse {}

export class RemoveAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: RemoveAnswerUseCaseRequest): Promise<RemoveAnswerUseCaseResponse | void> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed to remove')
    }
    await this.answersRepository.delete(answer)

    return {}
  }
}
