import { Test, TestingModule } from "@nestjs/testing";

import { LotteryController } from "@/feature/lottery/lottery.controller";

describe("LotteryController", () => {
  let controller: LotteryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotteryController],
    }).compile();

    controller = module.get<LotteryController>(LotteryController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
