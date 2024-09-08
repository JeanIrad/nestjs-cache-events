import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-ioredis-yet';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        isGlobal: true,
        store: await redisStore({
          host: 'localhost',
          port: 6379,
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
