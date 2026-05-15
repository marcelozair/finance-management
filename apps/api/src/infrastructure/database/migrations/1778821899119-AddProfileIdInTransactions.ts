import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfileIdInTransactions1778821899119 implements MigrationInterface {
  name = 'AddProfileIdInTransactions1778821899119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" ADD "profileId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" ADD CONSTRAINT "FK_b2f513eacb4cf145bc9bf7c4627" FOREIGN KEY ("profileId") REFERENCES "core"."mad_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" DROP CONSTRAINT "FK_b2f513eacb4cf145bc9bf7c4627"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" DROP COLUMN "profileId"`,
    );
  }
}
