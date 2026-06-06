/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Set` table. All the data in the column will be lost.
  - Added the required column `sessionExerciseId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_sessionId_fkey";

-- DropIndex
DROP INDEX "Set_exerciseId_idx";

-- DropIndex
DROP INDEX "Set_sessionId_idx";

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "exerciseId",
DROP COLUMN "sessionId",
ADD COLUMN     "sessionExerciseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SessionExercise" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SessionExercise_sessionId_idx" ON "SessionExercise"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionExercise_sessionId_exerciseId_key" ON "SessionExercise"("sessionId", "exerciseId");

-- AddForeignKey
ALTER TABLE "SessionExercise" ADD CONSTRAINT "SessionExercise_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionExercise" ADD CONSTRAINT "SessionExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_sessionExerciseId_fkey" FOREIGN KEY ("sessionExerciseId") REFERENCES "SessionExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
