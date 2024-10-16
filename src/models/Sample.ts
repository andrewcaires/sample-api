import { database, Model } from "@andrewcaires/api";
import { AutoIncrement, CreatedAt, Database, Integer, NotNull, PrimaryKey, String, TableName, UpdatedAt } from "@andrewcaires/sequelize";

@Database(database)
@TableName("sample")
export class Sample extends Model {

  @Integer()
  @PrimaryKey
  @NotNull
  @AutoIncrement
  declare id: number;

  @String()
  declare name: string;
  
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
