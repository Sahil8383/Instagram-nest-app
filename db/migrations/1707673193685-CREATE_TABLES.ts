import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATETABLES1707673193685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255) NOT NULL,
                "password" VARCHAR(255) NOT NULL,
                "avatar" VARCHAR(255),
                "followers" INTEGER DEFAULT 0,
                "following" INTEGER DEFAULT 0
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "post" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "image" VARCHAR(255),
                "likes" INTEGER DEFAULT 0,
                "dislikes" INTEGER DEFAULT 0,
                "userId" INTEGER REFERENCES "user"("id")
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" SERIAL PRIMARY KEY,
                "content" VARCHAR(255) NOT NULL,
                "likes" INTEGER DEFAULT 0,
                "dislikes" INTEGER DEFAULT 0,
                "postId" INTEGER REFERENCES "post"("id"),
                "madeById" INTEGER REFERENCES "user"("id")
            );
        `);
    }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
