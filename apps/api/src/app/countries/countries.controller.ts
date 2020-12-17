import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { Country } from './schemas/country.schema';

@ApiBearerAuth()
@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async findAll(@Query() query): Promise<Country[]> {
    return this.countriesService.findAll(query);
  }
}
