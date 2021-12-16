import { IUser } from './../user/user.interface';
import { IComment } from 'src/modals/comment/comment.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDTO implements Partial<IComment> {
  @ApiProperty() readonly comment!: string;
  @ApiProperty() readonly commentedBy!: Partial<IUser>;
}
