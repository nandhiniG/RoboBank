import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementProcessorComponent } from './statement-processor.component';

describe('StatementProcessorComponent', () => {
  let component: StatementProcessorComponent;
  let fixture: ComponentFixture<StatementProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
