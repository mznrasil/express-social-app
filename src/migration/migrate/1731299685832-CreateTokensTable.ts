import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokensTable1731299685832 implements MigrationInterface {
  name = "CreateTokensTable1731299685832";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "refresh_token" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_66b773780ac1e48b1494885208b" UNIQUE ("refresh_token"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8769073e38c365f315426554ca" ON "tokens" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66b773780ac1e48b1494885208" ON "tokens" ("refresh_token") `
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66b773780ac1e48b1494885208"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8769073e38c365f315426554ca"`
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
