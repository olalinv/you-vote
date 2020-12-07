import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SurveyTypesService } from './surveytypes.service';
import { SurveyType } from './schemas/surveytype.schema';

@ApiBearerAuth()
@ApiTags('surveytypes')
@Controller('surveytypes')
export class SurveyTypesController {
  constructor(private readonly surveytypesService: SurveyTypesService) {}

  @Get()
  async findAll(@Query() query): Promise<SurveyType[]> {
    return this.surveytypesService.findAll(query);
  }
}
