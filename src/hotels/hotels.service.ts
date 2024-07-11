import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';
import { UpdateResult } from 'typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class HotelsService {
  private readonly logger = new Logger(HotelsService.name);

  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
  ) {}

  async scrapeAndSaveHotel(name: string): Promise<Hotel> {
    const searchUrl = `http://www.booking.com/searchresults.es.html?ss=${encodeURIComponent(name)}`;
    this.logger.log(`Search URL: ${searchUrl}`);

    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);

    console.log($.html());

    const firstResultLink = $(
      'div.e01df12ddf a0914461b0 d46a3604b5 ba1c6fdc7f f550b7da28 b9a2fd8068 cb4a416743',
    )
      .first()
      .find('a.f0ebe87f68')
      .attr('href');
    if (!firstResultLink) {
      throw new Error('Hotel not found');
    }

    const hotelUrl = `http://www.booking.com${firstResultLink}`;
    const hotelResponse = await axios.get(hotelUrl);
    const $$ = cheerio.load(hotelResponse.data);

    const hotel: Hotel = new Hotel();
    hotel.name = $$('h2.af32860db5 pp__header-title').text().trim();
    hotel.location = $$(
      'span.hp_address_subtitle js-hp_address_subtitle jq_tooltip',
    )
      .text()
      .trim();
    hotel.description = $$(
      'div.bui-grid__column bui-grid__column-8 k2-hp--description',
    )
      .text()
      .trim();
    hotel.reviewScore = parseFloat(
      $$('div.d0522b0cca fd44f541d8').text().trim(),
    );
    hotel.numberOfComments = parseInt(
      $$('span.d0522b0cca ab107395cb c60bada9e4').text().trim().split(' ')[0],
    );
    hotel.photos = $$('div.gallery-side-reviews-wrapper js-no-close')
      .map((i, el) => $$(el).find('img').attr('src'))
      .get();
    hotel.amenities = $$('div.hp_desc_important_facilities li.bui-list__item')
      .map((i, el) => $$(el).text().trim())
      .get();

    return this.hotelsRepository.save(hotel);
  }

  findAll(): Promise<Hotel[]> {
    return this.hotelsRepository.find();
  }

  findOne(id: number): Promise<Hotel> {
    return this.hotelsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.hotelsRepository.delete(id);
  }

  async update(id: number, hotel: Partial<Hotel>): Promise<UpdateResult> {
    return await this.hotelsRepository.update(id, hotel);
  }
}
