import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/application/app.module'

// TODO: Przetestować to na powaznie...

describe('get-monthly-stats (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/api/stats/monthly (GET)', () => {
    return request(app.getHttpServer()).get('/api/stats/monthly').expect(200)
  })
})
