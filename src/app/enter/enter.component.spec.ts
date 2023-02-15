import { ComponentFixture, TestBed } from '@angular/core/testing';

import { enterComponent } from './enter.component';

describe('HomeComponent', () => {
  let component: enterComponent;
  let fixture: ComponentFixture<enterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ enterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(enterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
