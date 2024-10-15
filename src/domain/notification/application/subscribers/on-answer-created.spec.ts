import { makeAnswer } from 'test/factories/make-answer-factory'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersAttachementsRepository: InMemoryAnswerAttachmentsRepository
describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswersAttachementsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachementsRepository,
    )
  })
  it('should to send a notification when an answer was created', async () => {
    const onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)
  })
})
