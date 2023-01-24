-- AlterTable
ALTER TABLE `chat` MODIFY `message` VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `userName` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `imageUrl` VARCHAR(255) NULL,
    MODIFY `imageName` VARCHAR(255) NULL;
