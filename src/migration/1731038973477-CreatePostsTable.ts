import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostsTable1731038973477 implements MigrationInterface {
    name = 'CreatePostsTable1731038973477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" character varying(1000) NOT NULL, "tags" text array, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
