import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIDToPostTable1731046417550 implements MigrationInterface {
    name = 'AddUserIDToPostTable1731046417550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
