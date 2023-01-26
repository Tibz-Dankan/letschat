-- AlterTable
ALTER TABLE `user` ADD COLUMN `passwordResetToken` VARCHAR(191) NULL,
    ADD COLUMN `passwordTokenExpires` DATETIME(3) NULL;
