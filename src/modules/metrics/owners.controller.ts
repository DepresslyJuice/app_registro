import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { Public } from '@/modules/auth/decorators/public.decorator';

@Controller('owners')
export class OwnersController {
  @Public()
  @Get()
  getOwners() {
    // Deliberately simulate error 500 for testing purposes (Paso 9)
    throw new InternalServerErrorException('Error interno de servidor simulado en /owners');
  }
}
