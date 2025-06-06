import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFavoritesRepo } from './favorites.repository.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
@Injectable()
export class PersistentFavoritesRepository implements IFavoritesRepo {
  private readonly FAVORITES_SINGLETON_ID = 'global';

  constructor(private readonly prisma: PrismaService) { }

  private async getFavoritesSingleton(): Promise<any | null> {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: this.FAVORITES_SINGLETON_ID },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    return favorites;
  }

  private async checkEntityExistence(
    modelName: Prisma.ModelName,
    id: string,
  ): Promise<any> {
    const entity = await this.prisma[modelName].findUnique({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`${modelName} with ID ${id} not found`);
    }

    return entity;
  }

  private async updateFavoritesRelation<T extends 'artists' | 'albums' | 'tracks'>(
    relationField: T,
    entityId: string,
    operation: 'connect' | 'disconnect',
  ): Promise<unknown> {
    try {
      const updatedFavorites = await this.prisma.favorites.update({
        where: { id: this.FAVORITES_SINGLETON_ID },
        data: {
          [relationField]: {
            [operation]: { id: entityId },
          },
        },
        include: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
      return updatedFavorites;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error; // rethrow other unexpected errors
    }
  }

  async getFavorites(): Promise<any> {
    const favorites = await this.getFavoritesSingleton();
    return favorites || { artists: [], albums: [], tracks: [] };
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    await this.checkEntityExistence('Track', trackId);

    await this.updateFavoritesRelation<'tracks'>('tracks', trackId, 'connect');
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    await this.checkEntityExistence('Album', albumId);

    await this.updateFavoritesRelation<'albums'>('albums', albumId, 'connect');
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    await this.checkEntityExistence('Artist', artistId);

    await this.updateFavoritesRelation<'artists'>('artists', artistId, 'connect');
  }

  async removeTrackFromFavorites(trackId: string): Promise<boolean> {
    const favorites = await this.getFavoritesSingleton();
    if (!favorites || !favorites.tracks.some((t: { id: string }) => t.id === trackId)) {
      return false;
    }

    const result = await this.updateFavoritesRelation('tracks', trackId, 'disconnect');
    return result !== null;
  }

  async removeAlbumFromFavorites(albumId: string): Promise<boolean> {
    const favorites = await this.getFavoritesSingleton();
    if (!favorites || !favorites.albums.some((a: { id: string }) => a.id === albumId)) {
      return false;
    }

    const result = await this.updateFavoritesRelation('albums', albumId, 'disconnect');
    return result !== null;
  }

  async removeArtistFromFavorites(artistId: string): Promise<boolean> {
    const favorites = await this.getFavoritesSingleton();
    if (!favorites || !favorites.artists.some((a: { id: string }) => a.id === artistId)) {
      return false;
    }

    const result = await this.updateFavoritesRelation('artists', artistId, 'disconnect');
    return result !== null;
  }
}
