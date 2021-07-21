import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserAppService } from 'src/application/app-service/UserAppService';
import { UserDto } from 'src/application/dto/UserDto';
import { UserDtoSchema } from 'src/application/schema/UserDtoSchema';
import { ApiResponse } from 'src/base/model/ApiResponse';
import { UserDocument } from '../document/UserDocument';
import { ApiController } from '../infrastructure/ApiController';
import { Document } from '../infrastructure/decorator/DocumentDecorator';
import { ParsePipe } from '../infrastructure/pipe/ParsePipe';

@Controller('user')
export class UserController {
  constructor(private readonly _userAppService: UserAppService) {}

  @Post()
  @Document(UserDocument.post)
  async post(@Body(new ParsePipe(UserDtoSchema, UserDto)) user: UserDto): Promise<ApiResponse> {
    let users = await this._userAppService.add(user);
    return ApiController.Ok('Save success!', users);
  }

  @Get()
  @Document(UserDocument.read)
  async read(): Promise<ApiResponse> {
    let users = await this._userAppService.read();
    return ApiController.Ok('Consultation performed successfully', users);
  }
}
