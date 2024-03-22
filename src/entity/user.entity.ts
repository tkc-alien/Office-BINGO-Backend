import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { SheetEntity } from "@/entity/sheet.entity";

@Entity("users")
@Index("IDX_users_uid", ["uid"], { unique: true, where: "deleted_at IS NULL" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "uid" })
  uid: string;

  @Column({ name: "display_name" })
  displayName: string;

  @Column({ name: "avatar_url" })
  avatarUrl: string;

  @OneToMany(() => SheetEntity, (sheet) => sheet.user)
  sheets: SheetEntity[];

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  readonly deletedAt: Date;
}
