import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from '../../../typeorm/entities/user.entity'
import { CreateProductParams, CreateUserParams } from 'src/utils/types';
import { Product } from 'src/typeorm/entities/products.entity';

@Injectable()
export class UsersService {

    constructor(
                @InjectRepository(Product) private productRepository: Repository<Product>, @InjectRepository(User) private userRepository : Repository<User>
                ){}
    async getProducts(OwnerId){

        const products =  await this.productRepository.findBy({poster_id:OwnerId})
        const owner = await this.userRepository.findOneBy({id:OwnerId})
        console.log(owner.productids)
        console.log(products);
        
    }
    async addProduct(ownerId,productDetails: CreateProductParams){
        productDetails.ownerId = ownerId;
        const owner = await this.userRepository.findOneBy({id: ownerId});
        const newProduct = await this.productRepository.create({...productDetails})
        await this.productRepository.save(newProduct);
        
        
        const products = await this.productRepository.findBy({poster_id: ownerId})

        console.log(products);
        console.log(products[products.length-1].id)
        const id  = products[products.length-1].id

        owner.productids.push(id)
        console.log(owner.productids)
        await this.userRepository.save(owner);

    }
    async deleteProduct(pid){
        const product = await this.productRepository.findOneBy({id:pid})
        await this.productRepository.delete(product)
        return {code:200}
    
    }

}
