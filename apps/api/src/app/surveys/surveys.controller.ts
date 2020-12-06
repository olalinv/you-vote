import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  async create(@Body() dto: CreateSurveyDto) {
    // SurveyType is only 1 for now
    // dto.surveytype = 1;
    await this.surveysService.create(dto);
  }

  @Get()
  async findAll(@Query() query): Promise<Survey[]> {
    return this.surveysService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Survey> {
    return this.surveysService.findById(id);
  }

  // @Get(':userId')
  // async findByUser(@Param('userId') userId: string): Promise<Survey[]> {
  //   const user: User = new User();
  //   user._id = userId;
  //   return this.surveysService.findAllByUser(user);
  // }
}
