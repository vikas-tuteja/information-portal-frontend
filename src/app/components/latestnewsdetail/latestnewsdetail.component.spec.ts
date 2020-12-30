import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestnewsdetailComponent } from './latestnewsdetail.component';

describe('LatestnewsdetailComponent', () => {
  let component: LatestnewsdetailComponent;
  let fixture: ComponentFixture<LatestnewsdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestnewsdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestnewsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
