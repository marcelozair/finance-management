import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldCreditLine1777955479825 implements MigrationInterface {
  name = 'AddFieldCreditLine1777955479825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_wallets" ADD "creditLine" numeric(12,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_wallets" DROP COLUMN "creditLine"`,
    );
  }
}
