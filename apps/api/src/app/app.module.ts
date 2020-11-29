import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { SurveysModule } from './surveys/surveys.module';
import { SurveyTypesModule } from './surveytypes/surveytypes.module';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/youvote', {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    AnswersModule,
    CategoriesModule,
    SurveyTypesModule,
    SurveysModule,
    UsersModule,
    VotesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
