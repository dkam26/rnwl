import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  IsUUID,
} from "sequelize-typescript";
import { PetModel } from "../pet/pet.model";
import { ClaimType } from "./claim.types";
@Table({
  tableName: "claim",
  timestamps: true,
})
export class ClaimModel extends Model {
  @IsUUID(4)
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id?: string;
  @Column({
    type: DataType.STRING,
  })
  description!: string;
  @Column({
    type: DataType.DATE,
  })
  date!: Date;
  @Column({
    type: DataType.INTEGER,
  })
  cost!: number;
  @Column({
    type: DataType.ENUM,
    values: ClaimType,
  })
  status!: string;

  @ForeignKey(() => PetModel)
    @Column({
        type: DataType.STRING,
    })
    petId!: string;

  @BelongsTo(() => PetModel )
  pet!: PetModel;
}
