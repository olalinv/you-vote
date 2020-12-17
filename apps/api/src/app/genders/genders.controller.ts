import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GendersService } from './genders.service';
import { Gender } from './schemas/gender.schema';

@ApiBearerAuth()
@ApiTags('genders')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  async findAll(@Query() query): Promise<Gender[]> {
    return this.gendersService.findAll(query);
  }
}
