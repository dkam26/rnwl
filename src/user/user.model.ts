import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  HasMany,
} from "sequelize-typescript";
import { PetModel } from "../pet/pet.model";

@Table({
  tableName: "user",
  timestamps: true,
})
export class UserModel extends Model {
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
  email!: string;
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  password!: string;
  status!: string;
  @HasMany(() => PetModel)
  claims?: PetModel[];
}
