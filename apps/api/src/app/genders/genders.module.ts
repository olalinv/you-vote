import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, GenderSchema } from './schemas/gender.schema';
import { GendersController } from './genders.controller';
import { GendersService } from './genders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Gender.name, schema: GenderSchema },
    ]),
  ],
  controllers: [GendersController],
  providers: [GendersService],
})
export class GendersModule {}
