import { CreateProductRequestDto } from '../../dto/product.dto';

export class CreateProductCommand {
  constructor(public readonly dto: CreateProductRequestDto) {}
}
