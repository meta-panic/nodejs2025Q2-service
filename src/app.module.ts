import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';

@Module({
  imports: [UsersModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

