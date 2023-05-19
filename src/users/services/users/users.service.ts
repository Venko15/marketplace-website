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
        
        return products
        
    }
    async addProduct(ownerId,productDetails: CreateProductParams){
        
        productDetails.ownerId = ownerId;
        
        const owner = await this.userRepository.findOneBy({id: ownerId});
  
        const newProduct = await this.productRepository.create({...productDetails})
        newProduct.poster_id = ownerId
        newProduct.poster_at = new Date()

        await this.productRepository.save(newProduct);
        
        
        const products = await this.productRepository.findBy({poster_id: ownerId})

        const id  = products[products.length-1].id
        console.log(products)
        owner.productids.push(id)

        await this.userRepository.save(owner);

    }
    async inArray(arr:number[],pid){
        for(var i=0; i<arr.length; i++){
            if(arr[i] == pid){
                return true;
            }
        }
        return false;
    }
    async deleteProduct(uid:number,pid:number){

        const product = await this.productRepository.findOneBy({id:pid})
        const user = await this.userRepository.findOneBy({id:uid});
        const temparr = user.productids.filter((value)=> value != pid);
        user.productids = temparr
        
        await this.userRepository.save(user);

        await this.productRepository.delete({id:pid})
        return {code:200}
    
    }

}
