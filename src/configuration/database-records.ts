import { Prisma, Trip } from '@prisma/client'

/**
 * `DbRecords` is a namespace that contains all the types with database records, this is useful for mapping domain entities into persistence records and vice versa.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DatabaseRecords {
  export type TripCreateRecord = Prisma.TripCreateInput
  export type TripRecord = Trip
}
