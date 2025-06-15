import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import { ProductsRepository } from '../../products.repository';
import { CraeteProductResponseData } from '../../dto/product.dto';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<CraeteProductResponseData> {
    const { dto } = command;
    const newProduct = await this.productsRepository.createProduct(dto);

    return newProduct;
  }
}
