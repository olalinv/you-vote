import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Survey } from './schemas/survey.schema';

@ApiBearerAuth()
@ApiTags('surveys')
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @ApiOperation({ summary: 'Create survey' })
  @ApiResponse({
    status: 201,
    description: 'The survey has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    await this.surveysService.create(createSurveyDto);
  }

  @Get()
  async findAll(): Promise<Survey[]> {
    return this.surveysService.findAll();
  }
}
