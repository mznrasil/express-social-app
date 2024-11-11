import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPostRelation1731039409015 implements MigrationInterface {
    name = 'AddUserPostRelation1731039409015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "user_id"`);
    }

}
