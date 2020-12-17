import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Region, RegionDocument } from './schemas/region.schema';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region.name)
    private regionModel: Model<RegionDocument>
  ) {}

  async findAll(query): Promise<Region[]> {
    return this.regionModel.find(query).exec();
  }
}
