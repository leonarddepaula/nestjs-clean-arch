import { PaginationOutputMapper } from '@/shared/application/dtos/pagination-output.dto'
import { SearchResult } from '@/shared/domain/repositories/searchale-repository-contracts'
describe('PaginationOutpuMapper unit tests', () => {
  it('should converter a user in output', () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: '',
      sortDir: '',
      filter: 'fake',
    })

    const sut = PaginationOutputMapper.toOutput(result.items, result)

    expect(sut).toStrictEqual({
      items: result.items,
      total: result.total,
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
    })
  })
})
