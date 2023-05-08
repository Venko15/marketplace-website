import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({name: "products"})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ default: true, type:"float" })
    price: number;

    @Column()
    poster_id: number;    
    
    @Column()
    poster_at: Date;     

}