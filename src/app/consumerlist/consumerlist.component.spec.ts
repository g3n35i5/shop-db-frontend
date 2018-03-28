import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerlistComponent } from './consumerlist.component';

describe('ConsumerlistComponent', () => {
  let component: ConsumerlistComponent;
  let fixture: ComponentFixture<ConsumerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
