import { Entity } from '../../domain/entity/index'

/**
 * Mapper is a class that is responsible for mapping between domain and persistence layer.
 *
 * @version 1.0.0
 * @author Jakub "keinsell" Olan <keinsell@protonmail.com>
 * @see [Data Mapper Pattern](https://martinfowler.com/eaaCatalog/dataMapper.html)
 */
export interface Mapper<DomainEntity extends Entity, DbCreateRecord, DbRecord> {
  /**
   * Method for converting domain entity to persistence record.
   * @param entity Any {@link Entity `Entity`} instance.
   */
  toPersistence(entity: DomainEntity): DbCreateRecord

  /**
   * Method for converting persistence record to domain entity.
   * @param record Any record from database.
   */
  toDomain(record: DbRecord): DomainEntity
}
