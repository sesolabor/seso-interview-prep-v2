import { MigrationInterface, QueryRunner } from "typeorm";

export class INIT1616454894576 implements MigrationInterface {
  name = "INIT1616454894576";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TYPE "enterprise_org_type_enum" AS ENUM('FLC', 'GROWER')`, undefined);
    await queryRunner.query(
      `CREATE TABLE "enterprise" ("id" SERIAL NOT NULL, "legal_name" character varying NOT NULL, "fein" character varying, "org_type" "enterprise_org_type_enum", "agreement_form_signature" character varying, "is_agreed_to_sign_electronically" boolean, "date_agreement_form_signed" TIMESTAMP DEFAULT now(), "address_description" text, "address_place_id" character varying, "net_income" integer, "gross_income" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "agreement_form_signing_user_id" integer, CONSTRAINT "REL_cc7ae87d075ca97ef54ad65ea5" UNIQUE ("agreement_form_signing_user_id"), CONSTRAINT "PK_09687cd306dc5d486c0e227c471" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "password" text, "email" text, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone_number" character varying, "job_title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "enterprise_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `, undefined);
    await queryRunner.query(
      `CREATE TYPE "user_password_reset_token_status_enum" AS ENUM('COMPLETE', 'PENDING')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user_password_reset_token" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "user_password_reset_token_status_enum" NOT NULL, CONSTRAINT "PK_88ba6c57342f3e2591a9dc5d89f" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f7b06fb20a2de8fb841353c227" ON "user_password_reset_token" ("user_id") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "enterprise" ADD CONSTRAINT "FK_cc7ae87d075ca97ef54ad65ea58" FOREIGN KEY ("agreement_form_signing_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_bf1c9b8cb81dd0402007c6b74a1" FOREIGN KEY ("enterprise_id") REFERENCES "enterprise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bf1c9b8cb81dd0402007c6b74a1"`, undefined);
    await queryRunner.query(`ALTER TABLE "enterprise" DROP CONSTRAINT "FK_cc7ae87d075ca97ef54ad65ea58"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_f7b06fb20a2de8fb841353c227"`, undefined);
    await queryRunner.query(`DROP TABLE "user_password_reset_token"`, undefined);
    await queryRunner.query(`DROP TYPE "user_password_reset_token_status_enum"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "enterprise"`, undefined);
    await queryRunner.query(`DROP TYPE "enterprise_org_type_enum"`, undefined);
  }
}
