import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1635373014262 implements MigrationInterface {
  name = 'users1635373014262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_estadogeo_enum" AS ENUM('F', 'A')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "apellido" character varying(255) NOT NULL, "direccion" character varying(255) NOT NULL, "ciudad" character varying(255) NOT NULL, "longitud" double precision, "latitud" double precision, "estadogeo" "public"."users_estadogeo_enum", "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_estadogeo_enum"`);
  }
}
