-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL,
    "involvedid" TEXT[],

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);
