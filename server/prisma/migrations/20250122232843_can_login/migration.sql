/*
  Warnings:

  - You are about to drop the column `QrLatitude` on the `VisitedLocation` table. All the data in the column will be lost.
  - You are about to drop the column `QrLongitude` on the `VisitedLocation` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `VisitedLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VisitedLocation" DROP COLUMN "QrLatitude",
DROP COLUMN "QrLongitude",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "VisitedLocation" ADD CONSTRAINT "VisitedLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "ManagedLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
