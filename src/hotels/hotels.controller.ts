import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from './hotel.entity';
import { UpdateResult } from 'typeorm';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post('scrape')
  @ApiOperation({ summary: 'Scrape and save hotel information' })
  @ApiResponse({
    status: 201,
    description: 'The hotel has been successfully created.',
    type: Hotel,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  async scrapeAndSaveHotel(@Body('name') name: string): Promise<Hotel> {
    return this.hotelsService.scrapeAndSaveHotel(name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  @ApiResponse({
    status: 200,
    description: 'Return all hotels.',
    type: [Hotel],
  })
  findAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hotel by id' })
  @ApiResponse({ status: 200, description: 'Return the hotel.', type: Hotel })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  findOne(@Param('id') id: string): Promise<Hotel> {
    return this.hotelsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete hotel by id' })
  @ApiResponse({
    status: 204,
    description: 'The hotel has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.hotelsService.remove(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update hotel by id' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully updated.',
    type: UpdateResult,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  update(
    @Param('id') id: string,
    @Body() hotel: Partial<Hotel>,
  ): Promise<UpdateResult> {
    return this.hotelsService.update(+id, hotel);
  }
}
