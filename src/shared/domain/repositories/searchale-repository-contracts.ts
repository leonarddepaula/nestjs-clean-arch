import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'

export type SortDirection = 'asc' | 'desc'

export type SearchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filters?: Filter | null
}

export class SearchParams {
  protected _page: number
  protected _perPage = 15
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filters: string | null

  constructor(props: SearchProps) {
    this._page = props.page
    this._perPage = props.perPage
    this._sort = props.sort
    this._sortDir = props.sortDir
    this._filters = props.filters
  }
  get page() {
    return this._page
  }
  private set page(value: number) {}
  get perPage() {
    return this._perPage
  }
  private set perPage(value: number) {}
  get sort() {
    return this._sort
  }
  private set sort(value: string | null) {}
  get sortDir() {
    return this._sortDir
  }
  private set sortDir(value: string | null) {}
  get filters() {
    return this._filters
  }
  private set filters(value: string | null) {}
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(searchInput: SearchProps): Promise<SearchOutput>
}
