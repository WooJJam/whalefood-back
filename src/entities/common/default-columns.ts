import { PrimaryGeneratedColumn } from "typeorm";
import { CreatedAtColumn } from "./time-columns";

export abstract class defaultColumn extends CreatedAtColumn {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;
}