import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vote, VoteSchema } from './schemas/vote.schema';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
  ],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
