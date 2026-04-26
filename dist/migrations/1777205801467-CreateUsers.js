"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1777205801467 = void 0;
class CreateUsers1777205801467 {
    name = 'CreateUsers1777205801467';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "name" character varying(100), "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
exports.CreateUsers1777205801467 = CreateUsers1777205801467;
//# sourceMappingURL=1777205801467-CreateUsers.js.map