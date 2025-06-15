import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateReviewResponseDto } from '../reviews/dto/review.dto';
import { CreateReviewRequestDto } from '../reviews/dto/review.dto';
import { GetReviewsRequestDto } from '../reviews/dto/review.dto';
import {
  CreateProductCommand,
  UpdateProductCommand,
  DeleteProductCommand,
  CreateProductOptionCommand,
  UpdateProductOptionCommand,
  DeleteProductOptionCommand,
  CreateProductImageCommand,
} from './commands/impl';
import { ProductsService } from './products.service';
import { GetReviewsResponseDto } from '../reviews/dto/review.dto';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateReviewCommand } from '../reviews/commands/impl';
import {
  createPaginatedData,
  createSuccessResponse,
  createPaginatedResponse,
} from '~/common/utils/response.util';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
  GetProductResponseDto,
  GetProductsRequestDto,
  GetProductsResponseDto,
  UpdateProductRequestDto,
  UpdateProductResponseDto,
} from './dto/product.dto';
import { DeleteResponseDto } from '~/common/dto/response.dto';
import { RandomUser } from '~/common/decorators/random-user.decorator';
import {
  CreateProductOptionRequestDto,
  CreateProductOptionResponseDto,
  UpdateProductOptionRequestDto,
  UpdateProductOptionResponseDto,
} from './dto/product-option.dto';
import {
  CreateProductImageRequestDto,
  CreateProductImageResponseDto,
} from './dto/product-image.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService, // Query 로직은 아직 Service에 있으므로 유지
    private readonly reviewsService: ReviewsService,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getProducts(
    @Query() query: GetProductsRequestDto,
  ): Promise<GetProductsResponseDto> {
    const { items, total } = await this.productsService.getProducts(query);
    return createSuccessResponse(
      createPaginatedData(items, total, {
        page: query.page,
        per_page: query.per_page,
      }),
      '상품 목록을 성공적으로 조회했습니다.',
    );
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<GetProductResponseDto> {
    return createSuccessResponse(
      await this.productsService.getProduct(id),
      '상품 상세 정보를 성공적으로 조회했습니다.',
    );
  }

  @Post()
  async createProduct(
    @Body() dto: CreateProductRequestDto,
  ): Promise<CreateProductResponseDto> {
    const product = await this.commandBus.execute(new CreateProductCommand(dto));
    return createSuccessResponse(product, '상품이 성공적으로 등록되었습니다.');
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() dto: UpdateProductRequestDto,
  ): Promise<UpdateProductResponseDto> {
    const product = await this.commandBus.execute(
      new UpdateProductCommand(id, dto),
    );
    return createSuccessResponse(product, '상품이 성공적으로 수정되었습니다.');
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteResponseDto> {
    await this.commandBus.execute(new DeleteProductCommand(id));
    return createSuccessResponse(null, '상품이 성공적으로 삭제되었습니다.');
  }

  @Get(':id/reviews')
  async getReviews(
    @Param('id', new ParseIntPipe()) productId: number,
    @Query() query: GetReviewsRequestDto,
  ): Promise<GetReviewsResponseDto> {
    const { items, summary } = await this.reviewsService.getReviews(
      productId,
      query,
    );
    const { page, per_page } = query;
    return createSuccessResponse(
      {
        summary,
        ...createPaginatedData(items, summary.totalCount, {
          page,
          per_page,
        }),
      },
      '상품 리뷰를 성공적으로 조회했습니다.',
    );
  }

  @Post(':id/reviews')
  async createReview(
    @Param('id', new ParseIntPipe()) productId: number,
    @RandomUser() userId: number,
    @Body() dto: CreateReviewRequestDto,
  ): Promise<CreateReviewResponseDto> {
    const command = new CreateReviewCommand(productId, userId, dto);
    const result = await this.commandBus.execute(command);
    return createSuccessResponse(result, '리뷰가 성공적으로 등록되었습니다.');
  }

  @Post(':id/options')
  async createProductOption(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProductOptionRequestDto,
  ): Promise<CreateProductOptionResponseDto> {
    const option = await this.commandBus.execute(
      new CreateProductOptionCommand(id, dto),
    );
    return {
      success: true,
      data: option,
      message: '상품 옵션이 성공적으로 추가되었습니다.',
    };
  }

  @Put(':id/options/:optionId')
  async updateProductOption(
    @Param('id', ParseIntPipe) id: number,
    @Param('optionId', ParseIntPipe) optionId: number,
    @Body() dto: UpdateProductOptionRequestDto,
  ): Promise<UpdateProductOptionResponseDto> {
    const option = await this.commandBus.execute(
      new UpdateProductOptionCommand(id, optionId, dto),
    );
    return {
      success: true,
      data: option,
      message: '상품 옵션이 성공적으로 수정되었습니다.',
    };
  }

  @Delete(':id/options/:optionId')
  async deleteProductOption(
    @Param('id', ParseIntPipe) id: number,
    @Param('optionId', ParseIntPipe) optionId: number,
  ): Promise<DeleteResponseDto> {
    await this.commandBus.execute(
      new DeleteProductOptionCommand(id, optionId),
    );
    return {
      success: true,
      data: null,
      message: '상품 옵션이 성공적으로 삭제되었습니다.',
    };
  }

  @Post(':id/images')
  async createProductImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProductImageRequestDto,
  ): Promise<CreateProductImageResponseDto> {
    const image = await this.commandBus.execute(
      new CreateProductImageCommand(id, dto),
    );
    return {
      success: true,
      data: image,
      message: '상품 이미지가 성공적으로 추가되었습니다.',
    };
  }
}
