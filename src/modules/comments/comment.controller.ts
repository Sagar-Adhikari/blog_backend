import { AuthGuard } from '@nestjs/passport';
import { Comment, CommentDocument } from '../../modals/comment/comment.schema';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentService } from 'src/services/comment/comment.services';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCommentsDTO } from 'src/modals/comment/create-comment.dto';

@ApiTags('  Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly _commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('create-comment')
  async create(
    @Body() createCommentDTO: CreateCommentsDTO,
  ): Promise<CommentDocument> {
    return await this._commentService.create(createCommentDTO);
  }

  @Get('comments')
  async findAll(): Promise<Comment[]> {
    const res = await this._commentService.getAllComments();
    console.log(
      '🚀 ~ file: comment.controller.ts ~ line 29 ~ CommentController ~ findAll ~ res',
      res,
    );
    return res;
  }
}
