import { Test, TestingModule } from "@nestjs/testing";

import { SheetController } from "@/feature/sheet/sheet.controller";
import { SheetService } from "@/feature/sheet/sheet.service";

describe("SheetController", () => {
  let controller: SheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheetController],
      providers: [SheetService],
    }).compile();

    controller = module.get<SheetController>(SheetController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
