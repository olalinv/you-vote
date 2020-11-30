import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Types } from 'mongoose';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create comment' })
  async create(@Body() dto: CreateCommentDto) {
    await this.commentsService.create(dto);
  }

  @Get()
  async findAll(@Query() query): Promise<Comment[]> {
    for (const queryKey of Object.keys(query)) {
      console.log(`${queryKey}: ${query[queryKey]}`);
    }
    return this.commentsService.findAll(query);
  }
}
