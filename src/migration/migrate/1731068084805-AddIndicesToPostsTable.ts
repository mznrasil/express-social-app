import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndicesToPostsTable1731068084805 implements MigrationInterface {
  name = "AddIndicesToPostsTable1731068084805";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_e28aa0c4114146bfb1567bfa9a" ON "posts" ("title") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3553400a646a580c21e78b2f42" ON "posts" ("tags") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_52378a74ae3724bcab44036645" ON "posts" ("user_id") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_52378a74ae3724bcab44036645"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3553400a646a580c21e78b2f42"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e28aa0c4114146bfb1567bfa9a"`
    );
  }
}
