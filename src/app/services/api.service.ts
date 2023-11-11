import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private API_URL = "http://192.168.0.16:3000";
    constructor() { }

    async GetAllByFilter(category: string | null, name: string | null, page: number = 1, limit: number = 1): Promise<BaseResultModel> {
        const filter: any = {
            _page: page,
            _limit: limit
        }
    
        if(category) filter.category = category;
        if(name) filter.name_like = name;
    
        const query = new URLSearchParams(filter).toString();
        const response = await fetch(`${this.API_URL}/products?${query}`);
        const totalCount = response.headers.get('X-Total-Count');
        const result = await response.json();
    
        return { success: true, data: { products: result, totalCount: totalCount }, errors: null };
    }
    
    async GetById(id: number): Promise<BaseResultModel> {
        const response = await fetch(`${this.API_URL}/products/${id}`);
        const result = await response.json();
    
        return { success: true, data: result, errors: null };
    }

    async CheckStock(ids: number[]): Promise<BaseResultModel> {
        const response = await fetch(`${this.API_URL}/products/${ids}`);
        const result = await response.json();
    
        return { success: true, data: result, errors: null };
    }
}

export interface BaseResultModel {
    success: boolean;
    data: any;
    errors: any;
}