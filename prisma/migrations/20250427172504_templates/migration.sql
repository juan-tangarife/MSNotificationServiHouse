-- CreateTable
CREATE TABLE "mailTemplates" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "mailTemplates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageTemplates" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "texr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "messageTemplates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mailTemplates_event_key" ON "mailTemplates"("event");

-- CreateIndex
CREATE UNIQUE INDEX "messageTemplates_event_key" ON "messageTemplates"("event");
