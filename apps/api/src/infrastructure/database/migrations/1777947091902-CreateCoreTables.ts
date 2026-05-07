import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoreTables1777947091902 implements MigrationInterface {
  name = 'CreateCoreTables1777947091902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "core"."mad_users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(80) NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "secret" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_89afc6d1b8afe4a40a946cd1f6c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "core"."mad_profiles_currency_enum" AS ENUM('USD', 'EUR', 'GBP', 'PEN', 'MXN', 'JPY')`,
    );
    await queryRunner.query(
      `CREATE TABLE "core"."mad_profiles" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "color" character varying NOT NULL, "currency" "core"."mad_profiles_currency_enum" NOT NULL, "userId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_ef7cb6c469316377173d8158634" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."mad_wallets_type_enum" AS ENUM('Save', 'Credit', 'Debit', 'Cash')`,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."mad_wallets_currency_enum" AS ENUM('USD', 'EUR', 'GBP', 'PEN', 'MXN', 'JPY')`,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."mad_wallets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "finance"."mad_wallets_type_enum" NOT NULL, "color" character varying NOT NULL, "currency" "finance"."mad_wallets_currency_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "profileId" integer NOT NULL, CONSTRAINT "PK_4c986fedc07c88935f5290bc264" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."mad_transactions_type_enum" AS ENUM('income', 'expense', 'transfer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."mad_transactions" ("id" SERIAL NOT NULL, "amount" numeric(12,2) NOT NULL, "concept" character varying NOT NULL, "type" "finance"."mad_transactions_type_enum" NOT NULL, "categoryId" integer, "date" TIMESTAMP NOT NULL, "subCategoryId" integer, "walletId" integer NOT NULL, "destinationWalletId" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_81e880b31b6ed3d9c2c01376102" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."cat_sub_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iconName" character varying NOT NULL, "categoryId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3dfae34659b6e32d019845c7264" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."cat_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, "iconName" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_75d8888bd94f0c5e167d7e35ca2" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`
      INSERT INTO "finance"."cat_categories" (id, name, color, "iconName")
      VALUES
      (1, 'Food & Drinks', 'orange.400', 'food'),
      (2, 'Transport', 'blue.400', 'car'),
      (3, 'Entertainment', 'purple.400', 'game'),
      (4, 'Health', 'red.400', 'health'),
      (5, 'Education', 'teal.400', 'education'),
      (6, 'Utilities', 'yellow.500', 'utilities'),
      (7, 'Shopping', 'pink.400', 'shopping'),
      (8, 'Pets', 'pink.300', 'pet'),
      (9, 'Lifestyle', 'cyan.400', 'lifestyle'),
      (10, 'Income', 'green.500', 'wallet'),
      (11, 'Other', 'gray.400', 'other');

      INSERT INTO "finance"."cat_sub_categories" (name, "iconName", "categoryId")
      VALUES
      -- Food
      ('Groceries', 'cart', 1),
      ('Dining Out', 'restaurant', 1),
      ('Fast Food', 'burger', 1),
      ('Coffee', 'coffee', 1),
      ('Delivery', 'delivery', 1),

      -- Transport
      ('Public Transport', 'bus', 2),
      ('Taxi / Uber', 'taxi', 2),
      ('Fuel', 'fuel', 2),
      ('Parking', 'parking', 2),
      ('Car Maintenance', 'tools', 2),

      -- Entertainment
      ('Cinema', 'movie', 3),
      ('Streaming', 'tv', 3),
      ('Games', 'controller', 3),
      ('Events', 'ticket', 3),

      -- Health
      ('Pharmacy', 'pharmacy', 4),
      ('Doctor', 'doctor', 4),
      ('Insurance', 'insurance', 4),
      ('Gym', 'gym', 4),

      -- Education
      ('Courses', 'course', 5),
      ('Books', 'book', 5),

      -- Utilities
      ('Electricity', 'electricity', 6),
      ('Water', 'water', 6),
      ('Internet', 'wifi', 6),
      ('Phone', 'phone', 6),
      ('Rent', 'home', 6),

      -- Shopping
      ('Clothes', 'tshirt', 7),
      ('Electronics', 'laptop', 7),
      ('Home', 'sofa', 7),

      -- Pets
      ('Pet Food', 'pet-food', 8),
      ('Vet', 'vet', 8),
      ('Grooming', 'scissors', 8),

      -- Lifestyle
      ('Park / Activities', 'park', 9),
      ('Travel', 'plane', 9),
      ('Gifts', 'gift', 9),
      ('Dating', 'heart', 9),

      -- Income
      ('Salary', 'salary', 10),
      ('Freelance', 'laptop', 10),

      -- Other
      ('Miscellaneous', 'other', 11);
    `);

    await queryRunner.query(
      `ALTER TABLE "core"."mad_profiles" ADD CONSTRAINT "FK_4c83889a2fab55f19d140d5e657" FOREIGN KEY ("userId") REFERENCES "core"."mad_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_wallets" ADD CONSTRAINT "FK_fd0f095c4a8d69ce4a491191ec7" FOREIGN KEY ("profileId") REFERENCES "core"."mad_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" ADD CONSTRAINT "FK_22eee04108c2c60703b6709bd2f" FOREIGN KEY ("categoryId") REFERENCES "finance"."cat_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" ADD CONSTRAINT "FK_5787881009e1c7ce22dbf4211db" FOREIGN KEY ("subCategoryId") REFERENCES "finance"."cat_sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" ADD CONSTRAINT "FK_52ca1f3e97aa058e35b9fc1b9ea" FOREIGN KEY ("walletId") REFERENCES "finance"."mad_wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" ADD CONSTRAINT "FK_a3f75b83a4078d64af2326baf87" FOREIGN KEY ("destinationWalletId") REFERENCES "finance"."mad_wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."cat_sub_categories" ADD CONSTRAINT "FK_e0b0131dfea710a919602334be7" FOREIGN KEY ("categoryId") REFERENCES "finance"."cat_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "finance"."cat_sub_categories" DROP CONSTRAINT "FK_e0b0131dfea710a919602334be7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" DROP CONSTRAINT "FK_a3f75b83a4078d64af2326baf87"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" DROP CONSTRAINT "FK_52ca1f3e97aa058e35b9fc1b9ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" DROP CONSTRAINT "FK_5787881009e1c7ce22dbf4211db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_transactions" DROP CONSTRAINT "FK_22eee04108c2c60703b6709bd2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."mad_wallets" DROP CONSTRAINT "FK_fd0f095c4a8d69ce4a491191ec7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."mad_profiles" DROP CONSTRAINT "FK_4c83889a2fab55f19d140d5e657"`,
    );
    await queryRunner.query(`DROP TABLE "finance"."cat_categories"`);
    await queryRunner.query(`DROP TABLE "finance"."cat_sub_categories"`);
    await queryRunner.query(`DROP TABLE "finance"."mad_transactions"`);
    await queryRunner.query(`DROP TYPE "finance"."mad_transactions_type_enum"`);
    await queryRunner.query(`DROP TABLE "finance"."mad_wallets"`);
    await queryRunner.query(`DROP TYPE "finance"."mad_wallets_currency_enum"`);
    await queryRunner.query(`DROP TYPE "finance"."mad_wallets_type_enum"`);
    await queryRunner.query(`DROP TABLE "core"."mad_profiles"`);
    await queryRunner.query(`DROP TYPE "core"."mad_profiles_currency_enum"`);
    await queryRunner.query(`DROP TABLE "core"."mad_users"`);
  }
}
