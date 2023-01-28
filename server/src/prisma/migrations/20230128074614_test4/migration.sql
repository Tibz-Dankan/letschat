/*
  Warnings:

  - You are about to drop the column `passwordTokenExpires` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `passwordTokenExpires`,
    ADD COLUMN `passwordResetExpires` DATETIME(3) NULL;
