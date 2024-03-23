import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { LotteryEntity } from "@/entity/lottery.entity";
import { SheetEntity } from "@/entity/sheet.entity";

@Entity("sheet_squares")
@Index("IDX_sheet_squares_sheet_id_x_pos_y_pos", ["sheet", "xPos", "yPos"], {
  unique: true,
  where: "deleted_at IS NULL",
})
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
