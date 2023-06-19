import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { InfoComponent } from './info/info.component';
import { TreeService } from './service/tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements AfterViewInit {
  @ViewChild('treeChart', { static: false }) treeChart!: ElementRef;

  data: any[] = [];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private treeservice: TreeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    const chart: any = echarts.init(this.treeChart.nativeElement);

    chart.setOption({
      series: [
        {
          type: 'tree',
          data: [{ name: 'MO', children: this.data }],
          left: '10%',
          right: '10%',
          top: '22%',
          bottom: '25%',

          symbol: 'circle',
          symbolSize: 100,
          orient: 'vertical',
          expandAndCollapse: true,

          itemStyle: {
            color: 'rgba(45, 197, 126, 1)',
            borderColor: 'rgba(24, 112, 71, 1)',
          },

          label: {
            position: 'inside',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'center',
            color: 'white',
            fontSize: 15,
            fontWeight: 'bold',
          },

          animationDurationUpdate: 750,
        },
      ],
    });

    chart.on('click', async (node: any) => {
      if (node.data.name === 'MO' && node.data.children.length == 0) {
        const rs = await lastValueFrom(
          this.http.get<any>('http://localhost:4000/groupmenu')
        );

        const updatedChartData = this.transformData(rs.data);
        this.data.push(...updatedChartData);

        chart.setOption({
          series: [
            {
              data: [{ name: 'MO', children: this.data }],
            },
          ],
        });

        this.changeDetectorRef.detectChanges(); // เพิ่มการเรียกใช้ Change Detection

        console.log(this.data);
      } else if (node.data.headerName) {
        const rs = await lastValueFrom(
          this.http.get<any>('http://localhost:4000/child', {
            params: { id: node.data.id },
          })
        );
        const updatedChartData = this.transformData2(rs.data);

        const index = this.treeservice.getIndex(this.data, node.data);

        if (this.data[index].children === undefined) {
          this.data[index].children = [];
          this.data[index].children.push(...updatedChartData);

          chart.setOption({
            series: [{ data: [{ name: 'MO', children: this.data }] }],
          });

          this.changeDetectorRef.detectChanges(); // เพิ่มการเรียกใช้ Change Detection
        }

        console.log(this.data);
      } else if (node.data.subMenuName) {
        const rs = await lastValueFrom(
          this.http.get<any>('http://localhost:4000/box', {
            params: { id: node.data.id },
          })
        );
        const updatedChartData = this.transformData2(rs.data);

        const indexMenu = this.treeservice.getIndexs();

        const indexChild = this.data[indexMenu].children.findIndex(
          (item: any) => item.name === node.data.subMenuName
        );

        if (this.data[indexMenu].children[indexChild].children === undefined) {
          this.data[indexMenu].children[indexChild].children = [];
          this.data[indexMenu].children[indexChild].children.push(
            ...updatedChartData
          );
        }

        chart.setOption({
          series: [{ data: [{ name: 'MO', children: this.data }] }],
        });

        this.changeDetectorRef.detectChanges(); // เพิ่มการเรียกใช้ Change Detection

        console.log(this.data);
      }
    });

    chart.on('contextmenu', (node: any) => {
      console.log(node.data);
      console.log(node.name);
      this.treeChart.nativeElement.oncontextmenu = (event: any) => {
        event.preventDefault();
      };
      if (node.name) this.openDialog(node.name);
    });
  }

  transformData(data: any) {
    const chartData: any = [];
    data.map((item: any) => {
      const node = {
        name: item.headerName,
        headerName: item.headerName,
        id: item._id,
        icon: item.icon,
        activeFlg: item.activeFlg,
      };
      chartData.push(node);
    });
    return chartData;
  }

  transformData2(data: any) {
    const chartData: any = [];
    data.map((item: any) => {
      const node = {
        name: item.subMenuName,
        subMenuName: item.subMenuName,
        id: item._id,
        activeFlg: item.activeFlg,
      };
      chartData.push(node);
    });
    return chartData;
  }

  openDialog(name: string) {
    this.dialog.open(InfoComponent, {
      data: name,
    });
  }
}
