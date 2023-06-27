import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { TreeService } from '../../service/tree.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SearchComponent implements OnInit {
  @Input() dataOb: any;

  groupForm!: FormGroup;
  labelName: string = 'Group Name';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<SearchComponent>,
    private http: HttpClient,
    private treeservice: TreeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: '',
      active: '',
    });

    if (this.dataOb.header === 'headerName') {
      this.labelName = 'Menu Name';
    } else if (this.dataOb.header === 'subMenuName') {
      this.labelName = 'Box Name';
    } else if (this.dataOb.header === 'boxName') {
      this.labelName = 'Screen Name';
    }
    console.log(this.dataOb.header);
  }

  getData(header: string) {
    if (header === 'Group Name') {
      if (
        this.groupForm.value.name == '' &&
        this.groupForm.value.active == ''
      ) {
        this.treeservice.getMenu();
      } else {
        this.treeservice.getMenuFilter(this.groupForm.value);
      }
    } else if (header === 'Menu Name') {
      
      if (
        this.groupForm.value.name == '' &&
        this.groupForm.value.active == ''
      ) {
        this.treeservice.getChild(this.dataOb.id);
      } else {
        this.treeservice.getMenuFilter(this.groupForm.value);
      }
    } else if (header === 'Box Name') {
      this.treeservice.getBox(this.dataOb.id);
    } else if (header === 'Screen Name') {
      this.treeservice.getScreen(this.dataOb.id);
    }
  }
}
