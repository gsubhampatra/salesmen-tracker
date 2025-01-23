/*
  Warnings:

  - Added the required column `locationId` to the `AssignSalesman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssignSalesman" ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AssignSalesman" ADD CONSTRAINT "AssignSalesman_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "ManagedLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
