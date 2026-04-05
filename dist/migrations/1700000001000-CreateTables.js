"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1700000001000 = void 0;
class CreateTables1700000001000 {
    async up(queryRunner) {
        await queryRunner.query(`
  	CREATE TABLE categories (
    	id SERIAL PRIMARY KEY,
    	name VARCHAR(255) NOT NULL UNIQUE,
    	description TEXT,
    	"createdAt" TIMESTAMP DEFAULT now()
  	)
	`);
        await queryRunner.query(`
  	CREATE TABLE products (
    	id SERIAL PRIMARY KEY,
    	name VARCHAR(255) NOT NULL,
    	description TEXT,
    	price DECIMAL(10,2) NOT NULL,
    	stock INTEGER DEFAULT 0,
    	category_id INTEGER REFERENCES categories(id)
      	ON DELETE SET NULL,
    	"createdAt" TIMESTAMP DEFAULT now(),
    	"updatedAt" TIMESTAMP DEFAULT now()
  	)
	`);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE IF EXISTS products');
        await queryRunner.query('DROP TABLE IF EXISTS categories');
    }
}
exports.CreateTables1700000001000 = CreateTables1700000001000;
//# sourceMappingURL=1700000001000-CreateTables.js.map