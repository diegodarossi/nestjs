import { Injectable, Scope } from "@nestjs/common";
import { Connection, EntityManager, ObjectType, QueryRunner } from "typeorm";
import { BaseRepository } from "./repository/BaseRepository";
import { CompanyRepository } from "./repository/CompanyRepository";
import { UserRepository } from "./repository/UserRepository";

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork {
    private _queryRunner: QueryRunner;
  
    constructor(private readonly _connection: Connection) {
    }
    
    //#region Repositórios

    private _user: UserRepository;
    public user = () => this._user = this.getRepository(this._user, UserRepository)

    private _company: CompanyRepository;
    public company = () => this._company = this.getRepository(this._company, CompanyRepository);

    //#endregion

    //#region Métodos

    public async query(sql: string, parameters?: any[]): Promise<any> {
      return await this.getManager().query(sql, parameters);
    }

    public async startTransaction() {
      this._queryRunner = this._connection.createQueryRunner();
      await this._queryRunner.startTransaction()
    }

    public async commit() {
      await this._queryRunner.commitTransaction();
    }

    public async rollback() {
      await this._queryRunner.rollbackTransaction();
    }
    
    public async releaseConnection() {
      await this._queryRunner.release();
      this._queryRunner = null;
    }
    
    //#endregion

    //#region Helpers

    private getRepository<E, T extends BaseRepository<E>>(repository: T, objectType: ObjectType<T>): T {
      if (repository == null || repository.manager != this.getManager()) {
        repository = this.getManager().getCustomRepository(objectType);
      }

      return repository;
    }

    private getManager(): EntityManager {
      if (this._queryRunner != null) {
        return this._queryRunner.manager;
      } else {
        return this._connection.manager;
      }
    }
    
    //#endregion
}