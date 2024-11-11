import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameStatusColumnOfTokensTable1731316940265 implements MigrationInterface {
    name = 'RenameStatusColumnOfTokensTable1731316940265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" RENAME COLUMN "role" TO "status"`);
        await queryRunner.query(`ALTER TYPE "public"."tokens_role_enum" RENAME TO "tokens_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."tokens_status_enum" RENAME TO "tokens_role_enum"`);
        await queryRunner.query(`ALTER TABLE "tokens" RENAME COLUMN "status" TO "role"`);
    }

}
