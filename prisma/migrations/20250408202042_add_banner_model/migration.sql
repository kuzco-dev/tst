-- CreateTable
CREATE TABLE "banner" (
    "id" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banner_pseudo_key" ON "banner"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "banner_userId_key" ON "banner"("userId");

-- AddForeignKey
ALTER TABLE "banner" ADD CONSTRAINT "banner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
