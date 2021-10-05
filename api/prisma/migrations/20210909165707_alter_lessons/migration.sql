/*
  Warnings:

  - You are about to drop the `SchoolClassLesson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SchoolClassLesson" DROP CONSTRAINT "SchoolClassLesson_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "SchoolClassLesson" DROP CONSTRAINT "SchoolClassLesson_school_class_id_fkey";

-- DropTable
DROP TABLE "SchoolClassLesson";

-- CreateTable
CREATE TABLE "class_lessons" (
    "id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "school_class_id" TEXT NOT NULL,
    "public_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_lessons.id_unique" ON "class_lessons"("id");

-- AddForeignKey
ALTER TABLE "class_lessons" ADD FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_lessons" ADD FOREIGN KEY ("school_class_id") REFERENCES "school_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
