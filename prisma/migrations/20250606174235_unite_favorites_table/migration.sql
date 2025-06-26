/*
  Warnings:

  - You are about to drop the `FavAlbum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavArtist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavAlbumToAlbums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavArtistToArtists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavTrackToTracks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavAlbumToAlbums" DROP CONSTRAINT "_FavAlbumToAlbums_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavAlbumToAlbums" DROP CONSTRAINT "_FavAlbumToAlbums_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavArtistToArtists" DROP CONSTRAINT "_FavArtistToArtists_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavArtistToArtists" DROP CONSTRAINT "_FavArtistToArtists_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavTrackToTracks" DROP CONSTRAINT "_FavTrackToTracks_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavTrackToTracks" DROP CONSTRAINT "_FavTrackToTracks_B_fkey";

-- DropTable
DROP TABLE "FavAlbum";

-- DropTable
DROP TABLE "FavArtist";

-- DropTable
DROP TABLE "FavTrack";

-- DropTable
DROP TABLE "_FavAlbumToAlbums";

-- DropTable
DROP TABLE "_FavArtistToArtists";

-- DropTable
DROP TABLE "_FavTrackToTracks";

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL DEFAULT 'global',

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoritesArtists_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavoritesAlbums" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoritesAlbums_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavoritesTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoritesTracks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FavoritesArtists_B_index" ON "_FavoritesArtists"("B");

-- CreateIndex
CREATE INDEX "_FavoritesAlbums_B_index" ON "_FavoritesAlbums"("B");

-- CreateIndex
CREATE INDEX "_FavoritesTracks_B_index" ON "_FavoritesTracks"("B");

-- AddForeignKey
ALTER TABLE "_FavoritesArtists" ADD CONSTRAINT "_FavoritesArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesArtists" ADD CONSTRAINT "_FavoritesArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesAlbums" ADD CONSTRAINT "_FavoritesAlbums_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesAlbums" ADD CONSTRAINT "_FavoritesAlbums_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesTracks" ADD CONSTRAINT "_FavoritesTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesTracks" ADD CONSTRAINT "_FavoritesTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
