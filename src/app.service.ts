import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dto/dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreated } from './events/user-created.event';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly schedularRegistry: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    this.schedularRegistry.deleteCronJob('delete_expired_users');
    return 'Hello World!';
  }

  async createUser(body: UserDto) {
    this.logger.log('creating user', body);
    const userId = '123';
    this.eventEmitter.emit('user.created', new UserCreated(userId, body.email));
  }

  @OnEvent('user.created')
  welcomeNewUser(payload: UserCreated) {
    this.logger.log('welcoming new Users', payload.email);
  }

  @OnEvent('user.created', { async: true })
  async sendWelcomeGift(payload: UserCreated) {
    this.logger.log('sending a welcome gift', payload.userId);

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 3000);
    });
    this.logger.log('Welcome gift sent!');
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'delete_expired_users' })
  deleteExpiredUsers() {
    this.logger.log('deleting expired users...');
  }
}
