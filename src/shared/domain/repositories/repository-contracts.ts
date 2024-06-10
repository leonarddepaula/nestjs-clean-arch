import { Entity } from "../entities/entity";

export interface RepositoryInterface<E extends Entity> {
  inset (entity: E): Promise<void>;
  update (entity: E): Promise<void>;
  delete (entity: E): Promise<void>;
  findById (id: string): Promise<E | null>;
  findAll (): Promise<E[]>;
}
