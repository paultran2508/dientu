type QueueJob<Q extends String, P> = {
  queue: Q
  payload: P
}

type WelcomeEmail = {
  to: string
  body: string
}

type ProcessPayment = {
  userName: string
  accountId: number
}

type WelcomeEmailJob = QueueJob<"hello", WelcomeEmail>
type ProcessPaymentJob = QueueJob<"process", ProcessPayment>

type QueueName<J extends QueueJob<string, unknown>> = J extends QueueJob<infer N, unknown> ? N : never;
type EmailQueue = QueueName<WelcomeEmailJob>

type QueryOption = {
  table: 'user',
  userId: string
} | {
  table: 'session',
  sessionId: string
} | {
  table: 'widgets',
  widgetsId: string
}

function queryTable(options: QueryOption) {
  if (options.table == 'user') {
    options.userId = "test"
  }
}