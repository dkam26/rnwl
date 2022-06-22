import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { ClaimModel } from "../claim/claim.model";
import { UserModel } from "../user/user.model";
import { PetType, InsuranceStatus } from "./pet.types";

@Table({
  tableName: "pet",
  timestamps: true,
})
export class PetModel extends Model {
  @IsUUID(4)
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id?: string;
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name!: string;
  @Column({
    type: DataType.INTEGER,
  })
  age!: number;
  @Column({
    type: DataType.ENUM,
    values: PetType,
  })
  type!: string;
  @Column({
    type: DataType.ENUM,
    values: InsuranceStatus,
  })
  status!: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING,
  })
  clientId!: string;
  @HasMany(() => ClaimModel)
  claims?: ClaimModel[];

  @BelongsTo(() => UserModel)
  pet!: UserModel;
}
