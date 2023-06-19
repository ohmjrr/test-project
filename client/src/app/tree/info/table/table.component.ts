import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
})
export class TableComponent implements AfterViewInit {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddGroup(){
    this.dialog.open(CreateComponent)
  }

  openUpdateGroup(){
    this.dialog.open(UpdateComponent)
  }

  openDeleteGroup(){
    this.dialog.open(DeleteComponent)
  }
}

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'asdsadsd', name: 'Hydrogen', weight: 'Y' },
  { position: 'asdsadsd', name: 'Helium', weight: 'Y' },
  { position: 'asdsadsd', name: 'Lithium', weight: 'Y' },
  { position: 'asdsadsd', name: 'Beryllium', weight: 'Y' },
  { position: 'asdsadsd', name: 'Boron', weight: 'Y'},
  { position: 'asdsadsd', name: 'Carbon', weight: 'Y' },
  { position: 'asdsadsd', name: 'Nitrogen', weight: 'Y' },
  { position: 'asdsadsd', name: 'Oxygen', weight: 'Y'},
  { position: 'asdsadsd', name: 'Fluorine', weight: 'Y' },
  { position: 'asdsadsd', name: 'Neon', weight: 'Y' },
  { position: 'asdsadsd', name: 'Sodium', weight: 'Y' },
  { position: 'asdsadsd', name: 'Magnesium', weight: 'Y'},
  { position: 'asdsadsd', name: 'Aluminum', weight: 'Y' },
  { position: 'asdsadsd', name: 'Silicon', weight: 'Y' },
  { position: 'asdsadsd', name: 'Phosphorus', weight: 'Y' },
  { position: 'asdsadsd', name: 'Sulfur', weight: 'Y' },
  { position: 'asdsadsd', name: 'Chlorine', weight: 'Y' },
  { position: 'asdsadsd', name: 'Argon', weight: 'Y' },
  { position: 'asdsadsd', name: 'Potassium', weight: 'Y' },
  { position: 'asdsadsd', name: 'Calcium', weight: 'Y' },
];
