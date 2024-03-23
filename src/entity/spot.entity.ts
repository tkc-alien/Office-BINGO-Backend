import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("spots")
export class SpotEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "name" })
  name: string;

  @Column("decimal", { name: "latitude", precision: 7, scale: 5 })
  latitude: number;

  @Column("decimal", { name: "longitude", precision: 8, scale: 5 })
  longitude: number;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  readonly deletedAt: Date;
}
