-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesMan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "phone" TEXT,
    "canLogin" BOOLEAN NOT NULL DEFAULT true,
    "managerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesMan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagedLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "managerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagedLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitedLocation" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "QrLatitude" DOUBLE PRECISION NOT NULL,
    "QrLongitude" DOUBLE PRECISION NOT NULL,
    "UserLatitude" DOUBLE PRECISION NOT NULL,
    "UserLongitude" DOUBLE PRECISION NOT NULL,
    "salesManId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitedLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SalesMan_uid_key" ON "SalesMan"("uid");

-- AddForeignKey
ALTER TABLE "SalesMan" ADD CONSTRAINT "SalesMan_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagedLocation" ADD CONSTRAINT "ManagedLocation_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitedLocation" ADD CONSTRAINT "VisitedLocation_salesManId_fkey" FOREIGN KEY ("salesManId") REFERENCES "SalesMan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
