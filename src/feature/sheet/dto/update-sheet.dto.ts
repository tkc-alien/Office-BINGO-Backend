import { PartialType } from "@nestjs/mapped-types";

import { CreateSheetDto } from "@/feature/sheet/dto/create-sheet.dto";

export class UpdateSheetDto extends PartialType(CreateSheetDto) {}
