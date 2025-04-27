/*
  Warnings:

  - You are about to drop the column `texr` on the `messageTemplates` table. All the data in the column will be lost.
  - Added the required column `text` to the `messageTemplates` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "mailTemplates_event_key";

-- DropIndex
DROP INDEX "messageTemplates_event_key";

-- AlterTable
ALTER TABLE "mailTemplates" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "messageTemplates" DROP COLUMN "texr",
ADD COLUMN     "text" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
