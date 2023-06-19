import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TreeService {

  index!: number;

  constructor() {}

  getIndex(data: any, node: any): any {
   this.index =  data.findIndex((item: any) => item.name === node.name);
    return this.index;
    ;
  }

  getIndexs(){
    return this.index;
  }
}
