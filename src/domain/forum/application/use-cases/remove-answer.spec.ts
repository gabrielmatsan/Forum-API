import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { RemoveAnswerUseCase } from './remove-answer'
import { makeAnswer } from 'test/factories/make-answer-factory'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// sistem under test
let sut: RemoveAnswerUseCase
describe('Remove Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new RemoveAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to remove a answer', async () => {
    const newAnswer = makeAnswer()

    inMemoryAnswersRepository.create(newAnswer)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })
  it('should not be able to remove a answer from another user', async () => {
    const newAnswer = makeAnswer()

    inMemoryAnswersRepository.create(newAnswer)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)

    await expect(
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'another-author',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
