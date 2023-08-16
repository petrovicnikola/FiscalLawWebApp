import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmIssueBillSecondComponent } from './firm-issue-bill-second.component';

describe('FirmIssueBillSecondComponent', () => {
  let component: FirmIssueBillSecondComponent;
  let fixture: ComponentFixture<FirmIssueBillSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmIssueBillSecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmIssueBillSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
