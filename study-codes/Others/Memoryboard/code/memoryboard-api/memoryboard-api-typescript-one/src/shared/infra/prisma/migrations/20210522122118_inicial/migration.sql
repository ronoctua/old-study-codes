/*
  Warnings:

  - You are about to drop the column `icon` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "User_Note" ADD COLUMN     "permission" TEXT NOT NULL DEFAULT E'edit';
