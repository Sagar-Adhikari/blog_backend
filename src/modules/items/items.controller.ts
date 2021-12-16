import { IItem } from './../../modals/item/item.interface';
import { Request } from 'express';

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { getAuthUserFromAuthGuard } from 'src/utils/auth';
import { ItemDocument } from 'src/modals/item/item.schema';
import { PostItemDTO } from 'src/modals/item/item.dto';
import { ItemsService } from 'src/services/item/items.service';

@ApiTags('User Items')
@Controller()
export class ItemsController {
  constructor(private readonly _itemsService: ItemsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('item') // API Path
  createItem(
    @Req() request: Request,
    @Body() postItemDTO: PostItemDTO,
  ): Promise<ItemDocument> {
    const authUser = getAuthUserFromAuthGuard(request);
    const item: Partial<IItem> = {
      blogPostedBy: {
        _id: authUser._id,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
      },
      description: postItemDTO.description,
      name: postItemDTO.name,
    };
    return this._itemsService.create(item);
  }
}
