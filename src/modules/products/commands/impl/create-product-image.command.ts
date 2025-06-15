import { CreateProductImageRequestDto } from '../../dto/product-image.dto';

export class CreateProductImageCommand {
  constructor(
    public readonly productId: number,
    public readonly dto: CreateProductImageRequestDto,
  ) {}
}
