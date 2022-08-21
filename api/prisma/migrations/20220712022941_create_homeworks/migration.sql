-- CreateTable
CREATE TABLE "homeworks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "school_class_id" TEXT NOT NULL,
    "public_at" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "points" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "homework_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer_oprions" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "question_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "homeworks.id_unique" ON "homeworks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "questions.id_unique" ON "questions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "answer_oprions.id_unique" ON "answer_oprions"("id");

-- AddForeignKey
ALTER TABLE "homeworks" ADD FOREIGN KEY ("school_class_id") REFERENCES "school_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD FOREIGN KEY ("homework_id") REFERENCES "homeworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_oprions" ADD FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
