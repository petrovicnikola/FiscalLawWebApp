import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmTablesComponent } from './firm-tables.component';

describe('FirmTablesComponent', () => {
  let component: FirmTablesComponent;
  let fixture: ComponentFixture<FirmTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
