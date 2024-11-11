import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserAndPostEntity1731068180511 implements MigrationInterface {
    name = 'RenameUserAndPostEntity1731068180511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" character varying(1000) NOT NULL, "tags" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2d82eb2bb2ddd7a6bfac8804d8" ON "posts" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc1d8c1ff782f14133603c899c" ON "posts" ("tags") `);
        await queryRunner.query(`CREATE INDEX "IDX_c4f9a7bd77b489e711277ee598" ON "posts" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4f9a7bd77b489e711277ee598"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc1d8c1ff782f14133603c899c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d82eb2bb2ddd7a6bfac8804d8"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
