import { Test, TestingModule } from "@nestjs/testing";

import { SheetSquareService } from "@/feature/sheet-square/sheet-square.service";

describe("SheetSquareService", () => {
  let service: SheetSquareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheetSquareService],
    }).compile();

    service = module.get<SheetSquareService>(SheetSquareService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
