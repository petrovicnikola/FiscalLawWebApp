import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllFirmsComponent } from './admin-all-firms.component';

describe('AdminAllFirmsComponent', () => {
  let component: AdminAllFirmsComponent;
  let fixture: ComponentFixture<AdminAllFirmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllFirmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllFirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
