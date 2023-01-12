import { Mapper } from 'src/common/persistance/mapper'
import { Trip } from './trip.entity'
import { DatabaseRecords } from 'src/configuration/database-records'
import { Prisma, Trip as _Trip } from '@prisma/client'

export class TripMapper implements Mapper<Trip, DatabaseRecords.TripCreateRecord, DatabaseRecords.TripRecord> {
  toPersistence(entity: Trip): Prisma.TripCreateInput {
    throw new Error('Method not implemented.')
  }
  toDomain(record: _Trip): Trip {
    throw new Error('Method not implemented.')
  }
}
