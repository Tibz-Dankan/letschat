-- CreateTable
CREATE TABLE `User` (
    `userIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `imageName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_userIndex_key`(`userIndex`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `messageId` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `recipientId` VARCHAR(191) NOT NULL,
    `chatRoomId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `message` VARCHAR(350) NOT NULL,
    `isDelivered` BOOLEAN NOT NULL DEFAULT false,
    `isRead` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Chat_senderId_idx`(`senderId`),
    INDEX `Chat_recipientId_idx`(`recipientId`),
    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
