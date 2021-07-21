import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class Configuration {
  constructor(private env: { [k: string]: string | undefined }) {
  }

  private isProduction(): boolean {
      return this.env['MODE'] != 'DEV';
  }

  private getSourceMigration(): string {
    return this.isProduction() ? 'dist/typeorm/migrations/**/*.js' : 'src/typeorm/migrations/**/*{.js,.ts}';
  }

  private getSourceEntities(): string {
    return this.isProduction() ? 'dist/typeorm/configuration/**/*.js' : 'src/typeorm/configuration/**/*{.js,.ts}';
  }

  private getSprintAtual(): number {
    let inicio = new Date(2019, 6, 14); // Inicio da sprint 1
    let atual = new Date();
    let diferencaDias = Math.round((atual.getTime()-inicio.getTime())/(1000*60*60*24));
    
    return Math.floor(diferencaDias / 15);
  }

  public get(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.env['POSTGRES_HOST'],
      port: parseInt(this.env['POSTGRES_PORT']),
      username: this.env['POSTGRES_USER'],
      password: this.env['POSTGRES_PASSWORD'],
      database: this.env['POSTGRES_DATABASE'],
      migrationsTableName: 'Migration',
      migrations: [ this.getSourceMigration() ],
      entities: [ this.getSourceEntities() ],
      cli: { migrationsDir: `src/typeorm/migrations/sprint-${this.getSprintAtual()}` },
      ssl: false,
    } as TypeOrmModuleOptions;
  }
}

export const DbConfiguration = new Configuration(process.env);
