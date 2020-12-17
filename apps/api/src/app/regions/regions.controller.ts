import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { Region } from './schemas/region.schema';

@ApiBearerAuth()
@ApiTags('regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  async findAll(@Query() query): Promise<Region[]> {
    return this.regionsService.findAll(query);
  }
}
