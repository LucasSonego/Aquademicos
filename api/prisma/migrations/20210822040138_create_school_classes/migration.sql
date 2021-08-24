-- AlterTable
ALTER TABLE "users" ADD COLUMN     "school_class_id" TEXT;

-- CreateTable
CREATE TABLE "school_classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "school_classes.id_unique" ON "school_classes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "school_classes.name_unique" ON "school_classes"("name");

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("school_class_id") REFERENCES "school_classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
