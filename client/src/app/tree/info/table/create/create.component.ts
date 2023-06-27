import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TreeService } from 'src/app/tree/service/tree.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  groupForm!: FormGroup;
  btnForm: string = 'Group';

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public changeData: any,
    private formBuilder: FormBuilder,
    private treeservice: TreeService
  ) {}

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: '',
      icon: '',
      active: '',
    });

    if (this.changeData.header === 'headerName') {
      this.btnForm = 'Menu';
      this.groupForm = this.formBuilder.group({
        name: '',
        active: '',
      });
    } else if (this.changeData.header === 'subMenuName') {
      this.btnForm = 'Box';
      this.groupForm = this.formBuilder.group({
        name: '',
        active: '',
        department: '',
        detail: '',
      });
    } else if (this.changeData.header === 'boxName') {
      this.btnForm = 'Screen';
      this.groupForm = this.formBuilder.group({
        name: '',
        active: '',
        supgroup: '',
        url: '',
      });
    }
    console.log(this.changeData);
  }

  async createGroup() {
    try {
      if (this.changeData.header === 'headerName') {
        await lastValueFrom(
          this.http.post('http://localhost:4000/child/', {
            data: this.groupForm.value,
            id: this.changeData.id,
          })
        );
        this.close();
        this.treeservice.getChild(this.changeData.id);
      } else if (this.changeData.header === 'subMenuName') {
        await lastValueFrom(
          this.http.post('http://localhost:4000/box/', {
            data: this.groupForm.value,
            id: this.changeData.id,
          })
        );
        this.close();
        this.treeservice.getBox(this.changeData.id);
      } else if (this.changeData.header === 'boxName') {
        console.log(this.groupForm.value);

        await lastValueFrom(
          this.http.post('http://localhost:4000/redirect/', {
            data: this.groupForm.value,
            id: this.changeData.id,
          })
        );
        this.close();
        this.treeservice.getScreen(this.changeData.id);
      } else {
        await lastValueFrom(
          this.http.post(
            'http://localhost:4000/groupmenu/',
            this.groupForm.value
          )
        );
        this.close();
        this.treeservice.getMenu();
      }
    } catch (error) {
      console.log(error);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
