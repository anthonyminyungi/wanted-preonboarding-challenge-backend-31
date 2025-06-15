import { CreateProductOptionRequestDto } from '../../dto/product-option.dto';

export class CreateProductOptionCommand {
  constructor(
    public readonly productId: number,
    public readonly dto: CreateProductOptionRequestDto,
  ) {}
}
