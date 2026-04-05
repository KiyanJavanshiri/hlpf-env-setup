"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsActiveToProducts1775400342713 = void 0;
class AddIsActiveToProducts1775400342713 {
    name = 'AddIsActiveToProducts1775400342713';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "stock" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "stock" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
}
exports.AddIsActiveToProducts1775400342713 = AddIsActiveToProducts1775400342713;
//# sourceMappingURL=1775400342713-AddIsActiveToProducts.js.map