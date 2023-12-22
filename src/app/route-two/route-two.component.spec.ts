import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTwoComponent } from './route-two.component';

describe('RouteTwoComponent', () => {
  let component: RouteTwoComponent;
  let fixture: ComponentFixture<RouteTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
