import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../user/user.entity';

export class SeedUsers1617904230232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const batchSize = 10000; // Уменьшенный размер порции для вставки
    const totalRecords = 1000000; // Общее количество записей

    for (let i = 0; i < totalRecords; i += batchSize) {
      const users = [];
      for (let j = 0; j < batchSize; j++) {
        const index = i + j;
        users.push({
          firstName: `Name${index}`,
          lastName: `Surname${index}`,
          age: Math.floor(Math.random() * 50) + 20,
          gender: index % 2 === 0 ? 'Male' : 'Female',
          issues: Math.random() < 0.5,
        });
      }
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(users)
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user"`);
  }
}
