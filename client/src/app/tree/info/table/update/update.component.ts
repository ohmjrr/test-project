import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TreeService } from 'src/app/tree/service/tree.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  groupForm!: FormGroup;
  btnForm: string = 'Group';

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private treeservice: TreeService
  ) {}

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: '',
      icon: '',
      active: '',
    });

    if (this.editData.header === 'headerName') {
      this.btnForm = 'Menu';
      this.groupForm = this.formBuilder.group({
        name: '',
        active: '',
      });
    } else if (this.editData.header === 'subMenuName') {
      this.btnForm = 'Box';
      this.groupForm = this.formBuilder.group({
        name: '',
        active: '',
        department: '',
        detail: '',
      });
    } else if (this.editData.header === 'boxName') {
      this.btnForm = 'Screen';
      this.groupForm = this.formBuilder.group({
        name: '',
        active: '',
        supgroup: '',
        url: '',
      });
    }

    // if (this.editData) {
    //   this.groupForm.controls['name'].setValue(
    //     this.editData.element.headerName
    //   ),
    //     this.groupForm.controls['icon'].setValue(this.editData.element.icon),
    //     this.groupForm.controls['active'].setValue(
    //       this.editData.element.activeFlg
    //     );
    // }

    console.log(this.editData);
  }

  async editGroup() {
    try {
      if (this.editData.header === 'headerName') {
        await lastValueFrom(
          this.http.put(
            `http://localhost:4000/child/${this.editData.element._id}`,
            {
              data: this.groupForm.value,
              id: this.editData.element.groupMenuId,
            }
          )
        );
        this.close();
        this.treeservice.getChild(this.editData.element.groupMenuId);
      } else if (this.editData.header === 'subMenuName') {
        await lastValueFrom(
          this.http.put(
            `http://localhost:4000/box/${this.editData.element._id}`,
            {
              data: this.groupForm.value,
              id: this.editData.element.pageChildId,
            }
          )
        );
        this.close();
        this.treeservice.getBox(this.editData.element.pageChildId);
      } else if (this.editData.header === 'boxName') {
        await lastValueFrom(
          this.http.put(
            `http://localhost:4000/redirect/${this.editData.element._id}`,
            {
              data: this.groupForm.value,
              id: this.editData.element.pageBoxId,
            }
          )
        );
        this.close();
        this.treeservice.getScreen(this.editData.element.pageBoxId);
      } else {
        await lastValueFrom(
          this.http.put(
            `http://localhost:4000/groupmenu/${this.editData._id}`,
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
