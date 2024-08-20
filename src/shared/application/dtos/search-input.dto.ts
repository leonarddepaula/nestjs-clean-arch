import { SortDirection } from '@/shared/domain/repositories/searchale-repository-contracts'

export type SearchInputDto<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string
  sortDir?: SortDirection | null
  filter?: Filter | null
}
