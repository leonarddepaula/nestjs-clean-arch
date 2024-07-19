import { Entity } from '@/shared/domain/entities/entity'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { InMemoryRepository } from '../../in-memory.repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })

    await sut.insert(entity)

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should find entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })

    await sut.insert(entity)

    const result = await sut.findById(entity.id)

    expect(result.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('Should returns all entities', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })

  it('Should throw error on updated when entity not found', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should update a entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 10 })
    await sut.insert(entity)
    const entityUpdated = new StubEntity(
      { name: 'test name updated', price: 20 },
      entity.id,
    )
    await sut.update(entityUpdated)
    expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found', async () => {
    await expect(sut.delete('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should delete a entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    await sut.delete(entity._id)
    expect(sut.items).toStrictEqual([])
  })
})
