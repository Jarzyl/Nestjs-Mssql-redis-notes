import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738700685595 implements MigrationInterface {
    name = 'Migration1738700685595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note" ("id" int NOT NULL IDENTITY(1,1), "title" nvarchar(255) NOT NULL, "content" text NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e7c0567f5261063592f022e9b5b" DEFAULT getdate(), "userId" int, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`);
        await queryRunner.query(`DROP TABLE "note"`);
    }

}
