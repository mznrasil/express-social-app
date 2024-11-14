import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserFollowersRelation1731491359844 implements MigrationInterface {
    name = 'AddUserFollowersRelation1731491359844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_52378a74ae3724bcab44036645"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3553400a646a580c21e78b2f42"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e28aa0c4114146bfb1567bfa9a"`);
        await queryRunner.query(`CREATE TABLE "user_followers" ("followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_fb5cff70c10f57282caec64ecf0" PRIMARY KEY ("followerId", "followingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c3f56a3157b50bc8adcc6acf27" ON "user_followers" ("followerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b319cdc26936df06bca3feb3bc" ON "user_followers" ("followingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d82eb2bb2ddd7a6bfac8804d8" ON "posts" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc1d8c1ff782f14133603c899c" ON "posts" ("tags") `);
        await queryRunner.query(`CREATE INDEX "IDX_c4f9a7bd77b489e711277ee598" ON "posts" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_followers" ADD CONSTRAINT "FK_c3f56a3157b50bc8adcc6acf278" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_followers" ADD CONSTRAINT "FK_b319cdc26936df06bca3feb3bc2" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_followers" DROP CONSTRAINT "FK_b319cdc26936df06bca3feb3bc2"`);
        await queryRunner.query(`ALTER TABLE "user_followers" DROP CONSTRAINT "FK_c3f56a3157b50bc8adcc6acf278"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4f9a7bd77b489e711277ee598"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc1d8c1ff782f14133603c899c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d82eb2bb2ddd7a6bfac8804d8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b319cdc26936df06bca3feb3bc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3f56a3157b50bc8adcc6acf27"`);
        await queryRunner.query(`DROP TABLE "user_followers"`);
        await queryRunner.query(`CREATE INDEX "IDX_e28aa0c4114146bfb1567bfa9a" ON "posts" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_3553400a646a580c21e78b2f42" ON "posts" ("tags") `);
        await queryRunner.query(`CREATE INDEX "IDX_52378a74ae3724bcab44036645" ON "posts" ("user_id") `);
    }

}
