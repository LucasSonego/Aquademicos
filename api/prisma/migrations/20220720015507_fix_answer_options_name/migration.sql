/*
  Warnings:

  - You are about to drop the `answer_oprions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer_oprions" DROP CONSTRAINT "answer_oprions_question_id_fkey";

-- DropTable
DROP TABLE "answer_oprions";

-- CreateTable
CREATE TABLE "answer_options" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "question_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "answer_options.id_unique" ON "answer_options"("id");

-- AddForeignKey
ALTER TABLE "answer_options" ADD FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
