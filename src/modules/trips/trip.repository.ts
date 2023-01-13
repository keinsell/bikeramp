import { Trip } from './trip.entity'
import { TripMapper } from './trip.mapper'
import { Injectable } from '@nestjs/common'
import { Repository } from '../../common/persistance/repository'
import { PrismaService } from '../../infrastructure/prisma/prisma.service'
import { Sql } from '@prisma/client/runtime'
import { Prisma } from '@prisma/client'
import { getStartAndEndDateOfCurrentWeek } from '../../utilities/get-week-dates'

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

  // TODO: Add prettier formatter for sql

  /** Summarise distance and prices from all trips that happened from monday to sunday in current week. */
  async getDistanceAndPriceFromTripsInThisWeek(): Promise<{ distance: number; price: number }> {
    const { start: monday, end: sunday } = getStartAndEndDateOfCurrentWeek()

    const execute = await this.prismaService.$queryRaw<
      [{ total_distance: number; total_price: number }]
    >`SELECT SUM("distanceInKilometers") AS total_distance, SUM("priceInPLN") AS total_price FROM public."Trip" WHERE "date" > ${monday} ::timestamp AND "date" < ${sunday} ::timestamp`

    return { distance: Number(execute[0].total_distance ?? 0), price: Number(execute[0].total_price ?? 0) }
  }

  /** Query database to get stats for current month, returning organized data for statistics. */
  async getDistanceAndAveragePriceAndAverageDistanceFromTripsInThisMonth(): Promise<
    { day: Date; totalDistance: number; averagePrice: number; averageDistance: number }[]
  > {
    const execute = await this.prismaService.$queryRaw<
      { day: Date; total_distance: number; avg_price: number; avg_distance: number }[]
    >`SELECT date_trunc('day', "date") AS day, SUM("distanceInKilometers") AS total_distance, AVG("priceInPLN") AS avg_price, AVG("distanceInKilometers") AS avg_distance FROM public."Trip" WHERE date_trunc('month', "date") = date_trunc('month', CURRENT_DATE) GROUP BY day ORDER BY day`

    return execute.map((row) => ({
      day: row.day,
      totalDistance: Number(row.total_distance),
      averagePrice: Number(row.avg_price),
      averageDistance: Number(row.avg_distance),
    }))
  }
}
