-- CreateTable
CREATE TABLE "tb_book" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "length" INTEGER NOT NULL,

    CONSTRAINT "tb_book_pkey" PRIMARY KEY ("id")
);
