import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country, CountryDocument } from './schemas/country.schema';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
    private countryModel: Model<CountryDocument>
  ) {}

  async findAll(query): Promise<Country[]> {
    return this.countryModel.find(query).exec();
  }
}
