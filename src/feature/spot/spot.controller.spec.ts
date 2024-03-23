import { Test, TestingModule } from "@nestjs/testing";

import { SpotController } from "@/feature/spot/spot.controller";
import { SpotService } from "@/feature/spot/spot.service";

describe("SpotController", () => {
  let controller: SpotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotController],
      providers: [SpotService],
    }).compile();

    controller = module.get<SpotController>(SpotController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
