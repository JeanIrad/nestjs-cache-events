import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('item', { msg: 'Hello world' });
    await this.cacheManager.del('item');
    const item = await this.cacheManager.get('item');
    console.log(item);
    return 'Hello world';
  }
}
