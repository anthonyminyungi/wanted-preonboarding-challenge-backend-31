import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../impl/update-product.command';
import { ProductsRepository } from '../../products.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductResponseData } from '../../dto/product.dto';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    command: UpdateProductCommand,
  ): Promise<UpdateProductResponseData> {
    const { id, dto } = command;
    const product = await this.productsRepository.getProduct(id);
    if (!product) {
      throw new NotFoundException('요청한 상품을 찾을 수 없습니다.');
    }
    return this.productsRepository.updateProduct(id, dto);
  }
}
