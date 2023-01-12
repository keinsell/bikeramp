import { PrismaService } from 'src/infrastructure/prisma/prisma.service'
import { Trip } from './trip.entity'
import { Repository } from 'src/common/persistance/repository'
import { TripMapper } from './trip.mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TripRepository implements Repository<Trip> {
  constructor(private prismaService: PrismaService, private tripMapper: TripMapper) {}

  async findById(id: string): Promise<Trip | null> {
    const trip = await this.prismaService.trip.findUnique({ where: { id } })

    if (!trip) {
      return null
    }

    return this.tripMapper.toDomain(trip)
  }

  async save(entity: Trip): Promise<Trip> {
    // Update if exists
    const existingTrip = await this.findById(entity.id)

    if (existingTrip) {
      const place = await this.prismaService.trip.update({
        where: { id: entity.id },
        data: this.tripMapper.toPersistence(entity),
      })

      return this.tripMapper.toDomain(place)
    }

    // Create if not exists

    const place = await this.prismaService.trip.create({
      data: this.tripMapper.toPersistence(entity),
    })

    return this.tripMapper.toDomain(place)
  }
}
