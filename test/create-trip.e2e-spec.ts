import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/application/app.module'

// TODO: Przetestować to na powaznie...

describe('CreateTripController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/api/trips (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/trips')
      .send({
        start_address: 'Plac Europejski 2, Warszawa, Polska',
        destination_address: 'Kraków, Polska',
        price: 1,
        date: '2023-01-12',
      })
      .expect(201)
    //   .expect({
    //     id: 'clcu3sou20000pmrw7r3tjssb',
    //     startAddress: 'Plac Europejski 2, Warszawa, Polska',
    //     endAddress: 'Kraków, Polska',
    //     price: '1.00PLN',
    //     date: '2023-01-12T00:00:00.000Z',
    //     distance: '252km',
    //   })
  })
})
