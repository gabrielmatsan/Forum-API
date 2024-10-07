import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer-factory'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// sistem under test
let sut: EditAnswerUseCase
describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer()

    inMemoryAnswersRepository.create(newAnswer)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)

    await sut.execute({
      description: 'New Description Edit Test',
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
    })

    expect(inMemoryAnswersRepository.items[0].description).toEqual(
      'New Description Edit Test',
    )
  })
  it('should not be able to remove a answer from another user', async () => {
    const newAnswer = makeAnswer()

    inMemoryAnswersRepository.create(newAnswer)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)

    await expect(
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'another-author',
        description: 'This is a title test answer',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
