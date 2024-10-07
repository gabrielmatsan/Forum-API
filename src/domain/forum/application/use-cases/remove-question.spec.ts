import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question-factory'
import { RemoveQuestionUseCase } from './remove-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// sistem under test
let sut: RemoveQuestionUseCase
describe('Remove Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new RemoveQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to remove a question', async () => {
    const newQuestion = makeQuestion({ title: 'This is a title test question' })

    inMemoryQuestionsRepository.create(newQuestion)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
  it('should not be able to remove a question from another user', async () => {
    const newQuestion = makeQuestion({ title: 'This is a title test question' })

    inMemoryQuestionsRepository.create(newQuestion)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'another-author',
    })

    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
