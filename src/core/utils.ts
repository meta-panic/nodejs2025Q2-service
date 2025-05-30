import { randomUUID } from 'node:crypto';
import { IAlbumService } from 'src/modules/album/service/album.service.interface';
import { IArtistService } from 'src/modules/artist/service/artist.service.interface';
import { ITrackService } from 'src/modules/track/service/track.service.interface';
import { IUsersService } from 'src/modules/user/service/user.service.interface';

export function generateUUID(): string {
  return randomUUID();
}

type Services = IAlbumService | IArtistService | IUsersService | ITrackService;
export function nullifyEntityInField(
  service: Services,
  entityId: string,
  fieldId: string,
): void {
  const relatedEntities = service
    .findAll()
    .filter((record) => record[fieldId] === entityId);

  if (relatedEntities.length) {
    relatedEntities.forEach(({ id: recordId }) => {
      service.update(recordId, {
        [fieldId]: null,
      });
    });
  }
}
