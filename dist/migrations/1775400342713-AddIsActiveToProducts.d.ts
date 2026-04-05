import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIsActiveToProducts1775400342713 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
