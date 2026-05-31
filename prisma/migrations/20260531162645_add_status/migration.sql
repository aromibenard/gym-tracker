-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "Session_status_idx" ON "Session"("status");
