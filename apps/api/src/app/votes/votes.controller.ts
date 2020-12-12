import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './schemas/vote.schema';
import { VotesService } from './votes.service';

@ApiBearerAuth()
@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create vote' })
  @ApiResponse({
    status: 201,
    description: 'The vote has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createVote(@Body() createVoteDto: CreateVoteDto) {
    await this.votesService.createVote(createVoteDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() vote: CreateVoteDto) {
    return await this.votesService.update(id, vote);
  }

  @Get()
  async findAll(@Query() query): Promise<Vote[]> {
    return this.votesService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Vote> {
    return this.votesService.findById(id);
  }

  @Get('survey/:surveyId/user/:userId')
  async findOneBySurveyAndUser(@Param() params): Promise<Vote> {
    return this.votesService.findOneBySurveyAndUser(params);
  }
}
