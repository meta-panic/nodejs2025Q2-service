import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ReturnFavoritesDto } from '../dto/return-favorites';
import { IFavoriteService } from './favorite.service.interface';
import {
  FAVORITES_REPO,
  IFavoritesRepo,
} from '../repository/favorites.repository.interface';

@Injectable()
export class FavoriteService implements IFavoriteService {
  constructor(
    @Inject(FAVORITES_REPO)
    private readonly favRepo: IFavoritesRepo,
  ) { }

  async addTrack(id: string): Promise<void> {
    try {
      await this.favRepo.addTrackToFavorites(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Track with ID ${id} does not exist`,
        );
      }
      throw error;
    }
  }

  async deleteTrack(id: string): Promise<void> {
    const wasRemoved = await this.favRepo.removeTrackFromFavorites(id);
    if (!wasRemoved) {
      throw new NotFoundException(`Track with ID ${id} is not in favorites`);
    }
  }

  async addAlbum(id: string): Promise<void> {
    try {
      await this.favRepo.addAlbumToFavorites(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Album with ID ${id} does not exist`,
        );
      }
      throw error;
    }
  }

  async deleteAlbum(id: string): Promise<void> {
    const wasRemoved = await this.favRepo.removeAlbumFromFavorites(id);
    if (!wasRemoved) {
      throw new NotFoundException(`Album with ID ${id} is not in favorites`);
    }
  }

  async addArtist(id: string): Promise<void> {
    try {
      await this.favRepo.addArtistToFavorites(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Artist with ID ${id} does not exist`,
        );
      }
      throw error;
    }
  }

  async deleteArtist(id: string): Promise<void> {
    const wasRemoved = await this.favRepo.removeArtistFromFavorites(id);
    if (!wasRemoved) {
      throw new NotFoundException(`Artist with ID ${id} is not in favorites`);
    }
  }

  async findAll(): Promise<ReturnFavoritesDto> {
    const favorites = await this.favRepo.getFavorites();

    return plainToInstance(ReturnFavoritesDto, favorites, {
      excludeExtraneousValues: true,
    });
  }
}
