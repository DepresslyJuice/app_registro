import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { OwnersController } from './owners.controller';
import { MetricsMiddleware } from './metrics.middleware';

@Module({
  controllers: [MetricsController, OwnersController],
})
export class MetricsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MetricsMiddleware)
      .forRoutes('*'); // Apply globally to all incoming routes
  }
}
