import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { Image } from './schemas/image.schema';

@ApiBearerAuth()
@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async findAll(@Query() query): Promise<Image[]> {
    return this.imagesService.findAll(query);
  }
}
