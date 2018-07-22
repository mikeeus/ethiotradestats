/**
 * entitiesToHash converts an array of entities into a hash store using
 * a unique key.
 * @param entities an array of entities to turn into a hash store.
 * @param key a unique key to use in the hash
 */
export function entitiesToHash<T>(entities: T[], key: string = 'id'): {[key: string]: T} {
  const result = {};

  entities.map(entity => {
    result[entity[key]] = entity;
  })

  return result;
}
