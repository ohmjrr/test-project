import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TreeService } from 'src/app/tree/service/tree.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
  constructor(
    private http: HttpClient,
    private treeService: TreeService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit() {
    console.log(this.editData.header);
  }

  async deleteData() {
    try {
      if (this.editData.header === 'headerName') {
        await lastValueFrom(
          this.http.delete(
            `http://localhost:4000/child/${this.editData.element._id}`
          )
        );
        this.close();
        this.treeService.getChild(this.editData.element.groupMenuId);
      } else if (this.editData.header === 'subMenuName') {
        await lastValueFrom(
          this.http.delete(
            `http://localhost:4000/box/${this.editData.element._id}`
          )
        );
        this.close();
        this.treeService.getBox(this.editData.element.pageChildId);
      }else if (this.editData.header === 'boxName') {
        await lastValueFrom(
          this.http.delete(
            `http://localhost:4000/redirect/${this.editData.element._id}`
          )
        );
        this.close();
        this.treeService.getScreen(this.editData.element.pageBoxId);
      } else {
        await lastValueFrom(
          this.http.delete(
            `http://localhost:4000/groupmenu/${this.editData.element._id}`
          )
        );
        this.close();
        this.treeService.getMenu();
      }
    } catch (error) {
      console.log(error);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
