import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  data: any[] = [];

  constructor(private http: HttpClient) {}

  async getMenu() {
    try {
      const rs = await lastValueFrom(
        this.http.get<any>('http://localhost:4000/groupmenu')
      );
      this.data = rs.data;
      console.log(this.data);
      return this.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getMenuFilter(form: any) {
    try {
      const rs = await lastValueFrom(
        this.http.get<any>(`http://localhost:4000/groupmenu/filter`, {
          params: {
            name: form.name,
            active: form.active,
          },
        })
      );
      this.data = rs.data;
      console.log(rs);
    } catch (error) {
      console.log(error);
    }
  }

  async getChild(id: number) {
    try {
      const rs = await lastValueFrom(
        this.http.get<any>('http://localhost:4000/child/' + id)
      );

      this.data = rs.data;
      console.log(this.data);
      return this.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getChildFilter(form: any) {
    try {
      const rs = await lastValueFrom(
        this.http.get<any>(`http://localhost:4000/child/filter`, {
          params: {
            name: form.name,
            active: form.active,
          },
        })
      );
      this.data = rs.data;
      console.log(rs);
    } catch (error) {
      console.log(error);
    }
  }

  async getBox(id: number) {
    try {
      const rs = await lastValueFrom(
        this.http.get<any>(`http://localhost:4000/box/${id}`)
      );

      this.data = rs.data;
      console.log(this.data);
      return this.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getScreen(id: number) {
    try {
      const rs = await lastValueFrom(
        this.http.get<any>(`http://localhost:4000/redirect/${id}`)
      );
      this.data = rs.data;
      console.log(this.data);
      return this.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  getData() {
    return this.data;
  }

  cancelData() {
    this.data = [];
  }
}
