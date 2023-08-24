-- CreateTable
CREATE TABLE "Calendar" (
    "id" TEXT NOT NULL,
    "appoid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("appoid")
);
