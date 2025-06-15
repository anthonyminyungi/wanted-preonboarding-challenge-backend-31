import { UpdateReviewRequestDto } from '../../dto/review.dto';

export class UpdateReviewCommand {
  constructor(
    public readonly reviewId: number,
    public readonly userId: number,
    public readonly dto: UpdateReviewRequestDto,
  ) {}
}
