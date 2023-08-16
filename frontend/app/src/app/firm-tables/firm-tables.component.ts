import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirmTableDialogComponent } from '../firm-table-dialog/firm-table-dialog.component';
import { FirmTableMoveDialogComponent } from '../firm-table-move-dialog/firm-table-move-dialog.component';
import { FirmTableRoomDialogComponent } from '../firm-table-room-dialog/firm-table-room-dialog.component';
import { Room } from '../models/room';
import { Table } from '../models/table';
import { User } from '../models/user';
import { FirmService } from '../services/firm.service';

@Component({
  selector: 'app-firm-tables',
  templateUrl: './firm-tables.component.html',
  styleUrls: ['./firm-tables.component.css']
})
export class FirmTablesComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  
  
  private ctx: CanvasRenderingContext2D;

  constructor(private dialog: MatDialog, private firmService: FirmService) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;

    if (localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));

      this.firmService.getRooms(this.user.username).subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      })
    }
  }

  paint(){
    if (this.selectedRoom == null){
      alert("Prvo odaberite odeljenje!")
      return;
    }
    const dialogRef = this.dialog.open(FirmTableDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (localStorage.getItem('table') != null){
        let data = JSON.parse(localStorage.getItem('table'));
        this.name = data['name'];
        this.shape = data['shape'];
        this.width = Number.parseInt(data['width']);
        this.height = Number.parseInt(data['height']);
        this.r = Number.parseInt(data['r']);
        localStorage.removeItem('table');

        if (!this.checkTables(this.name)){
          alert("Identifikator stola nije jedinstven!");
          return;
        }

        let newTable: Table = new Table;
        newTable.height = this.height;
        newTable.width = this.width;
        newTable.name = this.name;
        newTable.shape = this.shape;
        newTable.r = this.r;
        newTable.x = 0;
        newTable.y = 0;


        let found: boolean = false;
        for (let i: number = 0; i < this.canvas.nativeElement.height; i++){
          if (found) break;
          for (let j: number = 0; j < this.canvas.nativeElement.width; j++){
            if (found) break;
            if (!found){
              if(newTable.shape == 'rect' && !this.checkOverlappingForRect(j, i, newTable.width.valueOf(), newTable.height.valueOf(), newTable.name)){
              newTable.x = j;
              newTable.y = i;
              found = true;
              this.tables.push(newTable);
              localStorage.setItem('tables', JSON.stringify(this.tables))
              this.paintTables();
              this.firmService.updateTables(this.user.username, this.selectedRoom.name, this.tables).subscribe((res)=>{

              });
            }
            else if (newTable.shape == 'circle' && !this.checkOverlappingForCircle(j, i, newTable.r.valueOf(), newTable.name)){
              newTable.x = j;
              newTable.y = i;
              found = true;
              this.tables.push(newTable);
              localStorage.setItem('tables', JSON.stringify(this.tables))
              this.paintTables();
              this.firmService.updateTables(this.user.username, this.selectedRoom.name, this.tables).subscribe((res) => {

              });
            }
          }
        }
      }
    }
    })
  }

  checkOverlappingForCircle(x: number, y: number, r: number, name) : boolean {
    let retVal = false;
    if (x - r < 0 || x + r > this.canvas.nativeElement.width || y - r < 0 || r + r > this.canvas.nativeElement.height)
      retVal = true;

    this.tables.forEach(table => {
      if (table.name != name){
        if (table.shape == 'circle' && this.checkTwoCirclesOverlap(x, y, r, table.x.valueOf(), table.y.valueOf(), table.r.valueOf()))
          retVal = true;
        else if (table.shape == 'rect'){
          let x2: number = Number.parseInt(table.x.toString()) + Number.parseInt(table.width.toString());
          let y2: number = Number.parseInt(table.y.toString()) + Number.parseInt(table.height.toString());
          if (this.checkRectAndCircleOverlap(table.x.valueOf(), table.y.valueOf(), x2, y2, x, y, r))
            retVal = true;
        }
      }
    });

    return retVal;
  }

  checkOverlappingForRect(x: number, y: number, width: number, height: number, name) : boolean {
    if (x + width > this.canvas.nativeElement.width || y + height > this.canvas.nativeElement.height)
      return true;
    let retVal: boolean = false;
    this.tables.forEach(table => {
      let x0: number =  Number.parseInt(x.toString()) + Number.parseInt(width.toString());
      let y0: number = Number.parseInt(y.toString()) + Number.parseInt(height.toString());
      let x1: number = Number.parseInt(table.x.toString()) + Number.parseInt(table.width.toString());
      let y1: number = Number.parseInt(table.y.toString()) + Number.parseInt(table.height.toString());
      if (table.shape == 'rect' && name != table.name){
        if (this.checkTwoRectsOverlap(new Point(x, y), new Point(x0, y0), new Point(table.x.valueOf(), table.y.valueOf()), new Point(x1, y1)))
          retVal = true;
      }
      else if (table.shape == 'circle' && name != table.name){
        if(this.checkRectAndCircleOverlap(x, y, x0, y0, table.x.valueOf(), table.y.valueOf(), table.r.valueOf()))
          retVal = true;
      }
    });

    return retVal;
  }

  checkTwoRectsOverlap(l1: Point, r1: Point, l2: Point, r2: Point): boolean{

    // If one rectangle is on left side of other
    if (l1.x > r2.x || l2.x > r1.x)
     return false;

    // If one rectangle is above other
    if (r1.y < l2.y || r2.y < l1.y)
      return false;

    return true;
  }

  checkTwoCirclesOverlap(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean{
    if  ((x1 - x2) * (x1 - x2) +
    (y1 - y2) * (y1 - y2) <= (r1 + r2) * (r1 + r2))
      return true;
    return false;
  }

  checkRectAndCircleOverlap(x1: number, y1: number, x2: number, y2: number, xc: number, yc: number, r: number): boolean{
    let Xn = Math.max(x1, Math.min(xc, x2));
    let Yn = Math.max(y1, Math.min(yc, y2));
       
    let Dx = Xn - xc;
    let Dy = Yn - yc;
    return (Dx * Dx + Dy * Dy) <= r * r;
  }

  moveTable(){
    if (this.selectedRoom == null)
      alert("Prvo izaberite odeljenje!");
    const dialogRef = this.dialog.open(FirmTableMoveDialogComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (localStorage.getItem('x') != null && localStorage.getItem('y') != null){
        let x: number = Number.parseInt(localStorage.getItem('x'));
        let y: number = Number.parseInt(localStorage.getItem('y'));
        let name = localStorage.getItem('name');
       
        let table: Table = null;

        console.log(name)

        this.tables.forEach(t => {
          if (t.name == name){
            table = t;
          }
        });

        if (table.shape == 'rect'){
          if(!this.checkOverlappingForRect(x, y, table.width.valueOf(), table.height.valueOf(), name)){
            this.tables.forEach(t => {
              if (t.name == table.name){
                t.x = x;
                t.y = y;
                this.paintTables();
                localStorage.setItem('tables', JSON.stringify(this.tables));
                this.firmService.updateTables(this.user.username, this.selectedRoom.name, this.tables).subscribe((res) => {
                  
                }); 
                
              }
            });
          }
          else
            alert("Stolovi se preklapaju!");
        }
        else if (table.shape == 'circle'){
          if (!this.checkOverlappingForCircle(x, y, table.r.valueOf(), table.name)){
            this.tables.forEach(t => {
              if (t.name == table.name){
                t.x = x;
                t.y = y;
                this.paintTables();
                localStorage.setItem('tables', JSON.stringify(this.tables));
                this.firmService.updateTables(this.user.username, this.selectedRoom.name, this.tables).subscribe((res) => {
                  
                }); 
                
              }
            });
          }
          else 
            alert("Stolovi se preklapaju!");
        }

        localStorage.removeItem('x');
        localStorage.removeItem('y');
        localStorage.removeItem('name');
      }
    })
  }

  paintTables(){
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.selectedRoom.tables.forEach(table => {
      if (table.shape == 'rect'){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(table.x.valueOf(), table.y.valueOf(), table.width.valueOf(), table.height.valueOf());
        this.ctx.fillStyle = 'white';
        this.ctx.font = "18px serif";
        this.ctx.fillText(table.name.toString(), table.x.valueOf() + 10, table.y.valueOf() + 15)
      }
      else if (table.shape == 'circle'){
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(table.x.valueOf(), table.y.valueOf(), table.r.valueOf(), 0, 2 * Math.PI)
        this.ctx.stroke();
        this.ctx.fillStyle = 'black';
        this.ctx.font = "18px serif";
        this.ctx.fillText(table.name.toString(), table.x.valueOf(), table.y.valueOf())
      }
    });
  }

  checkTables(name) : boolean{
    let ok: boolean = true;
    this.tables.forEach(table => {
      if (table.name == name)
        ok = false;
    });
    return ok;
  }

  selectRoom(r : Room){
    this.selectedRoom = r;
    this.tables = this.selectedRoom.tables;
    this.paintTables();
  }

  addRoom(){
    const dialogRef = this.dialog.open(FirmTableRoomDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (localStorage.getItem('roomName') != null){
        let exists: boolean = false;
        this.rooms.forEach(room => {
          if (room.name == localStorage.getItem('roomName'))
            exists = true;
        });
        if (!exists){
          this.firmService.addRoom(this.user.username, localStorage.getItem('roomName')).subscribe((res) => {
            localStorage.removeItem('roomName')
            window.location.reload();
          })
        }else {
          alert ("Ovo ime vec postoji!");
        }
      }
    }) 
  }

  name: String = '';
  shape: String = '';
  width: number;
  height: number;
  r: number;


  rooms: Room[] = [];
  tables: Table[] = [];
  selectedRoom: Room = null;
  user: User = null;
}


class Point{
  x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }
}