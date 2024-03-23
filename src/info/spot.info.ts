import { ApiProperty } from "@nestjs/swagger";

import { SpotEntity } from "@/entity";

export class SpotInfo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ format: "double" })
  readonly latitude: number;

  @ApiProperty({ format: "double" })
  readonly longitude: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(spot: SpotEntity) {
    this.id = spot.id;
    this.name = spot.name;
    this.latitude = spot.latitude;
    this.longitude = spot.longitude;
    this.createdAt = spot.createdAt;
    this.updatedAt = spot.updatedAt;
  }
}
