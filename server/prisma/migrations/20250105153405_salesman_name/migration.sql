/*
  Warnings:

  - Added the required column `name` to the `SalesMan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesMan" ADD COLUMN     "name" TEXT NOT NULL;
