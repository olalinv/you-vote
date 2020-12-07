import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

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
    // for (const key of Object.keys(query)) {
    //   console.log(`${key}: ${query[key]}`);
    // }
    return this.commentsService.findAll(query);
  }
}
