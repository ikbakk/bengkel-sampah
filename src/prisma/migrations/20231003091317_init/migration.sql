-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerID" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerID")
);

-- CreateTable
CREATE TABLE "Driver" (
    "driverID" TEXT NOT NULL,
    "driverStatus" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("driverID")
);

-- CreateTable
CREATE TABLE "Mitra" (
    "mitraID" TEXT NOT NULL,
    "mitraStatus" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Mitra_pkey" PRIMARY KEY ("mitraID")
);

-- CreateTable
CREATE TABLE "Nasabah" (
    "nasabahID" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Nasabah_pkey" PRIMARY KEY ("nasabahID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionID" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "source" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionID")
);

-- CreateTable
CREATE TABLE "Waste" (
    "wasteID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "wasteType" TEXT NOT NULL,

    CONSTRAINT "Waste_pkey" PRIMARY KEY ("wasteID")
);

-- CreateTable
CREATE TABLE "Waste_Submission" (
    "wasteSubmissionID" TEXT NOT NULL,
    "transactionID" TEXT NOT NULL,
    "wasteID" TEXT NOT NULL,
    "totalWeight" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Waste_Submission_pkey" PRIMARY KEY ("wasteSubmissionID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userID_key" ON "Customer"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_userID_key" ON "Driver"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Mitra_userID_key" ON "Mitra"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Nasabah_userID_key" ON "Nasabah"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Waste_Submission_transactionID_key" ON "Waste_Submission"("transactionID");

-- CreateIndex
CREATE UNIQUE INDEX "Waste_Submission_wasteID_key" ON "Waste_Submission"("wasteID");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mitra" ADD CONSTRAINT "Mitra_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nasabah" ADD CONSTRAINT "Nasabah_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
