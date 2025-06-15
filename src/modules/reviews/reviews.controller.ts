import { Controller, Body, Param, Delete, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  UpdateReviewRequestDto,
  UpdateReviewResponseDto,
} from './dto/review.dto';
import { createSuccessResponse } from '~/common/utils/response.util';
import { DeleteResponseDto } from '~/common/dto/response.dto';
import { RandomUser } from '~/common/decorators/random-user.decorator';
import { UpdateReviewCommand, DeleteReviewCommand } from './commands/impl';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put(':id')
  async updateReview(
    @Param('id') id: number,
    @Body() dto: UpdateReviewRequestDto,
    @RandomUser() userId: number,
  ): Promise<UpdateReviewResponseDto> {
    const command = new UpdateReviewCommand(id, userId, dto);
    const result = await this.commandBus.execute(command);
    return createSuccessResponse(result, '리뷰가 성공적으로 수정되었습니다.');
  }

  @Delete(':id')
  async deleteReview(
    @Param('id') id: number,
    @RandomUser() userId: number,
  ): Promise<DeleteResponseDto> {
    const command = new DeleteReviewCommand(id, userId);
    await this.commandBus.execute(command);
    return createSuccessResponse(null, '리뷰가 성공적으로 삭제되었습니다.');
  }
}
