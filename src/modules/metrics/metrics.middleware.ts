import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as client from 'prom-client';

// Define metrics
export const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

export const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, baseUrl, path } = req;

    res.on('finish', () => {
      const duration = (Date.now() - startTime) / 1000;
      const status = res.statusCode;
      
      // Determine the path/route to aggregate
      const route = req.route ? req.route.path : req.originalUrl.split('?')[0];
      
      // Exclude /metrics endpoint to prevent self-scraping noise
      if (!route.includes('/metrics')) {
        httpRequestsTotal.labels(method, route, status.toString()).inc();
        httpRequestDurationSeconds.labels(method, route, status.toString()).observe(duration);
      }
    });

    next();
  }
}
