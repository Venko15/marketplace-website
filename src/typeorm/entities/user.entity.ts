import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as bcrypt from "bcryptjs"

@Entity({name: "user_table"})
export class User{

  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({nullable:false, type: "varchar", default: "error"})
  name!:string;

  @Column({nullable:false, type: "varchar", default: "error"})
  email!: string;

  @Column({nullable:false, type: "varchar", default: "error"})
  password!: string;

  @Column('int', {array:true, nullable:true})
  productids: number[]=[];

  @Column({nullable:true, type: "varchar", default: "error"})
  refresh_token!: string;
  
  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

}