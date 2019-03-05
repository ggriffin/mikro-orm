import { EntityMetadata } from '../decorators/Entity';
import { MikroORMOptions } from '../MikroORM';
import { Utils } from '../utils/Utils';

export abstract class MetadataProvider {

  constructor(protected readonly options: MikroORMOptions) { }

  abstract async loadEntityMetadata(meta: EntityMetadata, name: string): Promise<void>;

  loadFromCache(meta: EntityMetadata, cache: EntityMetadata): void {
    Utils.merge(meta, cache);
  }

}