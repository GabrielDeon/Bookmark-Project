/*
  Warnings:

  - You are about to drop the column `rating` on the `UserBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookReview" ADD COLUMN     "rating" "Rating";

-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "rating";
