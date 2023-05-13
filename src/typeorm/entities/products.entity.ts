import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: "product_table"})
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:true, type: "varchar", default: "error"})
    name!:string;

    @Column({nullable:false})
    description!: string;

    @Column({ default: 0.00, type:"float" })
    price: number;

    @Column({nullable:true})
    poster_id: number;    
    
    @Column({nullable:true})
    poster_at: Date;     

}