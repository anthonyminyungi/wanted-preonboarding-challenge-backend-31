import { CreateReviewRequestDto } from '../../dto/review.dto';

export class CreateReviewCommand {
  constructor(
    public readonly productId: number,
    public readonly userId: number,
    public readonly dto: CreateReviewRequestDto,
  ) {}
}
