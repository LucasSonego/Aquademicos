-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "text_content" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolClassLesson" (
    "id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "school_class_id" TEXT NOT NULL,
    "public_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lessons.id_unique" ON "lessons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolClassLesson.id_unique" ON "SchoolClassLesson"("id");

-- AddForeignKey
ALTER TABLE "SchoolClassLesson" ADD FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolClassLesson" ADD FOREIGN KEY ("school_class_id") REFERENCES "school_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
