import { Uuid } from '../common/dto/abstract.dto';
import { UUIDField } from '../decorators/field.decorators';

export class FindOneUserDto {
  @UUIDField()
  id: Uuid;
}
