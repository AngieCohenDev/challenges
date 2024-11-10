import { PartialType } from '@nestjs/mapped-types';
import { CreatePeopleDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePeopleDto) {}
