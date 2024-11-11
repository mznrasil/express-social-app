import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimestampToPostsTable1731039260585 implements MigrationInterface {
    name = 'AddTimestampToPostsTable1731039260585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_at"`);
    }

}
