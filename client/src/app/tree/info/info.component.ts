import { Component,Inject ,OnInit,OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TreeService } from '../service/tree.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements  OnDestroy {

  dataOb:any = this.data

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InfoComponent>,
    private treeService: TreeService
  ) {}
  ngOnDestroy(){
    this.treeService.cancelData()
  }
  close(): void {
    this.dialogRef.close();

  }
}
