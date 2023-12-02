import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProgressComponent } from './see-progress.component';

describe('SeeProgressComponent', () => {
  let component: SeeProgressComponent;
  let fixture: ComponentFixture<SeeProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
