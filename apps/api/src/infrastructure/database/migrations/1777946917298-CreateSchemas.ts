import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchemas1777946917298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const schemas = ['finance', 'core'];
    for (const schema of schemas) {
      await queryRunner.connection.query(
        `CREATE SCHEMA IF NOT EXISTS "${schema}"`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schemas = ['finance', 'core'];
    for (const schema of schemas) {
      await queryRunner.connection.query(`DROP SCHEMA "${schema}" CASCADE`);
    }
  }
}
