import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
} from "sequelize-typescript";
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
    unique: true
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

}
