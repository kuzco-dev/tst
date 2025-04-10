/*
  Warnings:

  - Added the required column `url` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "store" ADD COLUMN     "url" TEXT NOT NULL;
