import { DomainEvents } from '@/core/events/domain-events'
import type { EventHandler } from '@/core/events/event-handler'
import { AnswerCreateEvent } from '@/domain/forum/enterprise/events/answer-create-event'

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification,
      AnswerCreateEvent.name,
    )
  }

  private async sendNewAnswerNotification() {}
}
