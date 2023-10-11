/*
  Warnings:

  - Added the required column `userID` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phoneNumber` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userID_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_userID_fkey";

-- DropForeignKey
ALTER TABLE "Mitra" DROP CONSTRAINT "Mitra_userID_fkey";

-- DropForeignKey
ALTER TABLE "Nasabah" DROP CONSTRAINT "Nasabah_userID_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "userID" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mitra" ADD CONSTRAINT "Mitra_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nasabah" ADD CONSTRAINT "Nasabah_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
