import { Trip } from './trip.entity'
import { Prisma, Trip as _Trip } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { dinero } from 'dinero.js'
import { PLN } from '@dinero.js/currencies'
import { Distance } from '../geocoding/entities/distance'
import { DatabaseRecords } from '../../configuration/database-records'
import { Mapper } from '../../common/persistance/mapper'

@Injectable()
export class TripMapper implements Mapper<Trip, DatabaseRecords.TripCreateRecord, DatabaseRecords.TripRecord> {
  toPersistence(entity: Trip): Prisma.TripCreateInput {
    return {
      startingAddress: entity.properties.startAddress,
      endingAddress: entity.properties.endAddress,
      priceInPLN: entity.properties.price.toJSON().amount / 100,
      date: entity.properties.date,
      distanceInKilometers: entity.properties.distance.baseScalar,
    }
  }
  toDomain(record: _Trip): Trip {
    return new Trip(
      {
        startAddress: record.startingAddress,
        endAddress: record.endingAddress,
        price: dinero({ amount: record.priceInPLN * 100, currency: PLN }),
        date: record.date,
        distance: new Distance(record.distanceInKilometers),
      },
      record.id,
    )
  }
}
