import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

import { LotteryEntity } from "@/entity/lottery.entity";
import { SheetEntity } from "@/entity/sheet.entity";

@Unique(["sheet", "xPos", "yPos"])
@Entity("sheet_squares")
export class SheetSquareEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @ManyToOne(() => SheetEntity, (sheet) => sheet.squares)
  @JoinColumn({ name: "sheet_id" })
  sheet: SheetEntity;

  @Column({ name: "x_pos" })
  xPos: number;

  @Column({ name: "y_pos" })
  yPos: number;

  @Column({ name: "number" })
  number: number;

  @OneToOne(() => LotteryEntity, { nullable: true })
  @JoinColumn({ name: "lottery_id" })
  lottery: LotteryEntity;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  readonly deletedAt: Date;
}
