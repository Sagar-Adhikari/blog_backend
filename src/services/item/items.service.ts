import { IItem } from './../../modals/item/item.interface';
import { mongoDBConfig } from './../../config/mongodb.config';
import { Model } from 'mongoose';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ItemDocument } from 'src/modals/item/item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(mongoDBConfig.collectionName.item)
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async create(item: Partial<IItem>): Promise<ItemDocument> {
    try {
      const newItem: ItemDocument = new this.itemModel(item);
      return await newItem.save();
    } catch (err) {
      throw new HttpException(
        'Unable to create an item',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findItem(itemID: string): Promise<ItemDocument> {
    const item = await this.itemModel.findById(itemID);
    if (!item) {
      throw new HttpException('Unable to find the Item', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async getAllPublishedItemsByUser(userId: string): Promise<number> {
    return await this.itemModel
      .find({
        'blogPostedBy._id': userId,
      })
      .count();
  }

  async searchItems(searchKeyword: string): Promise<ItemDocument[]> {
    const Fuse = require('fuse.js');
    const allItems = await this.itemModel.find({
      status: 'published',
    });
    const options = {
      includeScore: true,
      keys: ['name', 'description', 'tags.name'],
    };
    const fuse = new Fuse(allItems, options);
    const searchResults = fuse.search(searchKeyword);
    return searchResults.map((result) => result.item);
  }
}
