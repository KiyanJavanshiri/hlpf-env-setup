import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateOrders1779630480817 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
