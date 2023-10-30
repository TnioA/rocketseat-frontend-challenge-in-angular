import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private DEFAULT_CART_LOCAL_STORAGE_NAME = "erabizaileak";
    public cartProducts: ProductModel[] = [];

    constructor() {
        this.updateInternal();
    }

    updateInternal() {
        console.log("atualizado o carrinho");
        var cartProducts: ProductModel[] = JSON.parse(localStorage.getItem(this.DEFAULT_CART_LOCAL_STORAGE_NAME) ?? "[]");
        if (!cartProducts || cartProducts.length < 1) {
            this.cartProducts = [];
            return;
        }

        this.cartProducts = cartProducts;
    }

    getTotalInfoCart() {
        if(this.cartProducts.length < 1)
            return [0, 0];

        const count = this.cartProducts.map(item => item.count).reduce((prev, next) => prev + next);
        const value = this.cartProducts.map(item => item.price * item.count).reduce((prev, next) => prev + next);
        return [count, value ];
    }

    get() {
        this.updateInternal();
        return this.cartProducts;
    }

    add(product: ProductModel) {
        this.updateInternal();

        var productInCart = this.cartProducts.find(x => x.id === product.id);
        if (!productInCart) {
            this.cartProducts.push(product);
            this.updateCartProducts(this.cartProducts);
            return;
        }

        this.cartProducts.forEach(x => {
            if(x.id === product.id)
                x.count = x.count + 1;
        });

        this.updateCartProducts(this.cartProducts);
    }

    update(product: ProductModel) {
        this.updateInternal();

        var productInCart = this.cartProducts.find(x => x.id === product.id);
        if (!productInCart) {
            this.cartProducts.push(product);
            this.updateCartProducts(this.cartProducts);
            return;
        }

        this.cartProducts.forEach(x => {
            if(x.id === product.id)
                x.count = product.count;
        });

        this.updateCartProducts(this.cartProducts);
    }

    remove(id: number) {
        this.updateInternal();

        var newCarProductList = this.cartProducts.filter(x=> x.id !== id);
        this.updateCartProducts(newCarProductList);
    }
    
    updateCartProducts(newCartProductsList: ProductModel[]) {
        localStorage.setItem(this.DEFAULT_CART_LOCAL_STORAGE_NAME, JSON.stringify(newCartProductsList));
        this.cartProducts = newCartProductsList;
    }
}