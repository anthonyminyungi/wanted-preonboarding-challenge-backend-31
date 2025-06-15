import { CreateProductHandler } from './create-product.handler';
import { UpdateProductHandler } from './update-product.handler';
import { DeleteProductHandler } from './delete-product.handler';
import { CreateProductOptionHandler } from './create-product-option.handler';
import { UpdateProductOptionHandler } from './update-product-option.handler';
import { DeleteProductOptionHandler } from './delete-product-option.handler';
import { CreateProductImageHandler } from './create-product-image.handler';

export const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  CreateProductOptionHandler,
  UpdateProductOptionHandler,
  DeleteProductOptionHandler,
  CreateProductImageHandler,
];
