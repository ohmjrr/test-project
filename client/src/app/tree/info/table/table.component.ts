import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { TreeService } from '../../service/tree.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, CommonModule],
})
export class TableComponent implements AfterViewInit {
  @Input() dataOb: any;

  btnName: string = 'Add Group';

  constructor(public dialog: MatDialog, public treeservice: TreeService) {}

  displayedColumns: string[] = ['Groupname', 'Icon', 'Activeflag', 'Option'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    if (this.dataOb.header === 'headerName') {
      this.btnName = 'Add Menu';
      this.displayedColumns = ['menuName', 'Activeflag', 'Option'];
    } else if (this.dataOb.header === 'subMenuName') {
      this.btnName = 'Add Box';
      this.displayedColumns = [
        'Boxname',
        'Department',
        'Detail',
        'Activeflag',
        'Option',
      ];
    } else if (this.dataOb.header === 'boxName') {
      this.btnName = 'Add Screen';
      this.displayedColumns = [
        'Screenname',
        'Url',
        'Subgroup',
        'Activeflag',
        'Option',
      ];
    }
    console.log(this.dataOb);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddGroup() {
    this.dialog.open(CreateComponent, {data : this.dataOb});
  }

  openUpdateGroup(element: any) {
    this.dialog.open(UpdateComponent, {
      data: { element, header: this.dataOb.header }
    });
  }

  openDeleteGroup(element: any) {
    console.log(element);
    
    this.dialog.open(DeleteComponent, {
      data: { element, header: this.dataOb.header }
    });
  }

  // getMenu() {
  //   this.treeservice.getMenu().then((data) => {
  //     this.dataSource.data = data;
  //   });
  // }
}
