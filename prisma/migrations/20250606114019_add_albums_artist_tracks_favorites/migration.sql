/*
  Warnings:

  - You are about to alter the column `createdAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedAt" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,
    "favoritesId" TEXT,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,
    "favoritesId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,
    "favoritesId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavTrack" (
    "id" TEXT NOT NULL DEFAULT 'singleton',

    CONSTRAINT "FavTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavAlbum" (
    "id" TEXT NOT NULL DEFAULT 'singleton',

    CONSTRAINT "FavAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavArtist" (
    "id" TEXT NOT NULL DEFAULT 'singleton',

    CONSTRAINT "FavArtist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "FavArtist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "FavAlbum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "FavTrack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
