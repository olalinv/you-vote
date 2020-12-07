import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(dto);
    return createdComment.save();
  }

  async findAll(query): Promise<Comment[]> {
    return this.commentModel.find(query).exec();
  }
}
