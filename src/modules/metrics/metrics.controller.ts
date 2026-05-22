import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as client from 'prom-client';
import { Public } from '@/modules/auth/decorators/public.decorator';

@Controller('metrics')
export class MetricsController {
  constructor() {
    // Collect standard Node.js process/runtime metrics
    client.collectDefaultMetrics();
  }

  @Public()
  @Get()
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  }
}
