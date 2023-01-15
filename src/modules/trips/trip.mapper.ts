import { Trip } from './trip.entity'
import { Prisma, Trip as _Trip } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { Distance } from '../geocoding/entities/distance'
import { DatabaseRecords } from '../../configuration/database-records'
import { Mapper } from '../../common/persistance/mapper'
import { Money } from './entities/money'

@Injectable()
export class TripMapper implements Mapper<Trip, DatabaseRecords.TripCreateRecord, DatabaseRecords.TripRecord> {
  toPersistence(entity: Trip): Prisma.TripCreateInput {
    return {
      startingAddress: entity.properties.startAddress,
      endingAddress: entity.properties.endAddress,
      priceInPLN: entity.properties.price.toFloat(),
      date: entity.properties.date,
      distanceInKilometers: entity.properties.distance.baseScalar,
    }
  }
  toDomain(record: _Trip): Trip {
    return new Trip(
      {
        startAddress: record.startingAddress,
        endAddress: record.endingAddress,
        price: Money.fromFloat(record.priceInPLN),
        date: record.date,
        distance: new Distance(record.distanceInKilometers),
      },
      record.id,
    )
  }
}
