import { PrismaService } from 'src/infrastructure/prisma/prisma.service'
import { Trip } from './trip.entity'
import { Repository } from 'src/common/persistance/repository'
import { TripMapper } from './trip.mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TripRepository implements Repository<Trip> {
  constructor(private prismaService: PrismaService, private tripMapper: TripMapper) {}
  save(entity: Trip): Promise<Trip> {
    throw new Error('Method not implemented.')
  }
}
