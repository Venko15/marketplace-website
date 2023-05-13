import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from '../../../typeorm/entities/user.entity'
import { CreateProductParams, CreateUserParams } from 'src/utils/types';
import { Product } from 'src/typeorm/entities/products.entity';

@Injectable()
export class UsersService {

    constructor(
                @InjectRepository(Product) private productRepository: Repository<Product>
                ){}
    async getProducts(OwnerId){

        const products =  await this.productRepository.findBy({poster_id:OwnerId})
        console.log(products);
    }
    addProduct(productDetails: CreateProductParams){
        console.log(this.productRepository);
        const newProduct = this.productRepository.create({...productDetails})
        this.productRepository.save(newProduct);
    }

}
