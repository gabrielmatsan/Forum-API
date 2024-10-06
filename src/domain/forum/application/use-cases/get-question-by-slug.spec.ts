import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question-factory'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// sistem under test
let sut: GetQuestionBySlugUseCase
describe('Get Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({ title: 'This is a title test question' })
    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: newQuestion.slug.value,
    })

    expect(question.authorId).toBeTruthy()
    expect(question.slug.value).toEqual('this-is-a-title-test-question')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
