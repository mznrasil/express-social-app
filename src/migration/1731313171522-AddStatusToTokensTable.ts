import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToTokensTable1731313171522 implements MigrationInterface {
    name = 'AddStatusToTokensTable1731313171522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tokens_role_enum" AS ENUM('active', 'used', 'revoked')`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "role" "public"."tokens_role_enum" NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."tokens_role_enum"`);
    }

}
