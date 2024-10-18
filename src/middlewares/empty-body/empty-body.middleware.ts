import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmptyBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('Casilleros vacíos');
    }

    next();
  }
}
