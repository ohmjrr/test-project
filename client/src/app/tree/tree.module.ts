import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { TreeComponent } from './tree.component';
import { TreeRoutingModule } from './tree-routing.module';
import { InfoComponent } from './info/info.component';
import { SearchComponent } from './info/search/search.component';
import { TableComponent } from './info/table/table.component';
import { CreateComponent } from './info/table/create/create.component';
import { UpdateComponent } from './info/table/update/update.component';
import { DeleteComponent } from './info/table/delete/delete.component';
import { TreeService } from './service/tree.service';

@NgModule({
  declarations: [
    TreeComponent,
    InfoComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    TreeRoutingModule,
    MatDialogModule,
    TableComponent,
    SearchComponent,
    HttpClientModule,
  ],
  providers: [TreeService],
})
export class TreeModule {}
