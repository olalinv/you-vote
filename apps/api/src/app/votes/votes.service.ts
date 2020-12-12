import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './schemas/vote.schema';

@Injectable()
export class VotesService {
  constructor(@InjectModel(Vote.name) private voteModel: Model<Vote>) {}

  async createVote(createVoteDto: CreateVoteDto): Promise<Vote> {
    const createdVote = new this.voteModel(createVoteDto);
    return createdVote.save();
  }

  async update(id: string, dto: CreateVoteDto): Promise<Vote> {
    const toUpdate = await this.voteModel.findOne({ _id: id });
    const updated = Object.assign(toUpdate, dto);
    const updatedVote = new this.voteModel(updated);
    return updatedVote.save();
  }

  async findAll(query: (err: any, res: Vote[]) => void): Promise<Vote[]> {
    return this.voteModel.find(query).exec();
  }

  async findById(id: string): Promise<Vote> {
    return this.voteModel.findById(id).exec();
  }

  async findOneBySurveyAndUser(
    query: (err: any, res: Vote) => void
  ): Promise<Vote> {
    return this.voteModel.findOne(query).exec();
  }
}
