import { database, Migrate, Model } from "@andrewcaires/api";
import { CreatedAt, Database, DeletedAt, Id, String, TableName, UpdatedAt } from "@andrewcaires/sequelize";

@Database(database)
@TableName("sample")
@Migrate("0.0.0")
export class Sample extends Model {

  @Id()
  declare id: number;

  @String()
  declare name: string;
  
  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @DeletedAt
  declare deleted_at: Date;
}
