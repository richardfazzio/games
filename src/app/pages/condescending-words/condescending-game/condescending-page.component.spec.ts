import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondescendingPageComponent } from './condescending-page.component';

describe('CondescendingPageComponent', () => {
  let component: CondescendingPageComponent;
  let fixture: ComponentFixture<CondescendingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondescendingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondescendingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
