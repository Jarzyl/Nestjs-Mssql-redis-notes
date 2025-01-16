import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737061041502 implements MigrationInterface {
    name = 'Migration1737061041502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    }

}
