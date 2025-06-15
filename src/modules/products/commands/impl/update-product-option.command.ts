import { UpdateProductOptionRequestDto } from '../../dto/product-option.dto';

export class UpdateProductOptionCommand {
  constructor(
    public readonly productId: number,
    public readonly optionId: number,
    public readonly dto: UpdateProductOptionRequestDto,
  ) {}
}
