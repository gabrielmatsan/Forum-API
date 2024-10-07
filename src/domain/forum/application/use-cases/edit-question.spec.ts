import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question-factory'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// sistem under test
let sut: EditQuestionUseCase
describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion()

    inMemoryQuestionsRepository.create(newQuestion)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await sut.execute({
      title: 'New Title Edit Test',
      description: 'New Description Edit Test',
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].title).toEqual(
      'New Title Edit Test',
    )
  })
  it('should not be able to remove a question from another user', async () => {
    const newQuestion = makeQuestion({ title: 'This is a title test question' })

    inMemoryQuestionsRepository.create(newQuestion)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await expect(
      sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'another-author',
        title: 'This is a title test question',
        description: 'This is a title test question',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
