import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmIssueBillComponent } from './firm-issue-bill.component';

describe('FirmIssueBillComponent', () => {
  let component: FirmIssueBillComponent;
  let fixture: ComponentFixture<FirmIssueBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmIssueBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmIssueBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
