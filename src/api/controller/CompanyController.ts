import { Body, Controller, Post } from '@nestjs/common';
import { CompanyAppService } from 'src/application/app-service/CompanyAppService';
import { CompanyDto } from 'src/application/dto/CompanyDto';
import { UserDto } from 'src/application/dto/UserDto';
import { CompanyDtoSchema } from 'src/application/schema/CompanyDtoSchema';
import { UserDtoSchema } from 'src/application/schema/UserDtoSchema';
import { ApiResponse } from 'src/base/model/ApiResponse';
import { ApiController } from '../infrastructure/ApiController';
import { ParsePipe } from '../infrastructure/pipe/ParsePipe';

@Controller('company')
export class CompanyController {
  constructor(private readonly _companyAppService: CompanyAppService) {}

  @Post()
  async post(@Body(new ParsePipe(CompanyDtoSchema, CompanyDto)) company: CompanyDto,
             @Body(new ParsePipe(UserDtoSchema, UserDto)) user: UserDto): Promise<ApiResponse> {
    let users = await this._companyAppService.changeUserCompany(company, user);
    return ApiController.Ok('Save success!', users);
  }
}
