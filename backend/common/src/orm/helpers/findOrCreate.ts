import { Repository, DeepPartial } from 'typeorm'

const getObjPartial = <T extends {}, K extends keyof T>(obj: T, keys?: K[]) =>
  keys && keys.length
    ? keys.reduce((partialObj, key) => ({ ...partialObj, [key]: obj[key] }), {})
    : { ...obj }

const getFindOptions = <T extends {}, K extends keyof T>(
  obj: T | T[],
  keys?: K[],
) => ({
  where: Array.isArray(obj)
    ? obj.map(itemObj => getObjPartial(itemObj, keys))
    : getObjPartial(obj, keys),
})

function isArray<Item extends {}, ArrayOfItem extends Item[]>(
  array: any,
): array is ArrayOfItem {
  return Array.isArray(array as ArrayOfItem)
}

type FindOrCreate = <Entity>(
  repo: Repository<Entity>,
) => (
  seeds: Array<DeepPartial<Entity>>,
  fields?: Array<keyof DeepPartial<Entity>>,
) => Promise<Entity[]>

export const findOrCreate: FindOrCreate = <Entity>(
  repo: Repository<Entity>,
) => (
  seeds: Array<DeepPartial<Entity>>,
  fields?: Array<keyof DeepPartial<Entity>>,
) => {
  const findOptions = getFindOptions(seeds, fields)
  const findEntries = repo.find(findOptions)

  return findEntries.then<Entity[]>((entities: Entity[]) => {
    if (entities && isArray(entities) && entities.length) {
      return entities
    }

    return repo.save(seeds)
  })
}

type FindOneOrCreate = <Entity>(
  repo: Repository<Entity>,
) => (
  seed: DeepPartial<Entity>,
  fields?: Array<keyof DeepPartial<Entity>>,
) => Promise<Entity>

export const findOneOrCreate: FindOneOrCreate = <Entity>(
  repo: Repository<Entity>,
) => (seed: DeepPartial<Entity>, fields?: Array<keyof DeepPartial<Entity>>) => {
  const findOptions = getFindOptions(seed, fields)
  const findEntries = repo.findOne(findOptions)

  return findEntries.then<Entity>((entity: Entity) => {
    if (entity) {
      return entity
    }

    return repo.save(seed)
  })
}
