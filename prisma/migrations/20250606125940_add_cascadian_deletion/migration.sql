/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoritesId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoritesId";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favoritesId";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoritesId";

-- CreateTable
CREATE TABLE "_FavArtistToArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavArtistToArtists_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavAlbumToAlbums" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavAlbumToAlbums_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavTrackToTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavTrackToTracks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FavArtistToArtists_B_index" ON "_FavArtistToArtists"("B");

-- CreateIndex
CREATE INDEX "_FavAlbumToAlbums_B_index" ON "_FavAlbumToAlbums"("B");

-- CreateIndex
CREATE INDEX "_FavTrackToTracks_B_index" ON "_FavTrackToTracks"("B");

-- AddForeignKey
ALTER TABLE "_FavArtistToArtists" ADD CONSTRAINT "_FavArtistToArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavArtistToArtists" ADD CONSTRAINT "_FavArtistToArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "FavArtist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavAlbumToAlbums" ADD CONSTRAINT "_FavAlbumToAlbums_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavAlbumToAlbums" ADD CONSTRAINT "_FavAlbumToAlbums_B_fkey" FOREIGN KEY ("B") REFERENCES "FavAlbum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavTrackToTracks" ADD CONSTRAINT "_FavTrackToTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "FavTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavTrackToTracks" ADD CONSTRAINT "_FavTrackToTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
