import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoUpdateComponent } from './distrito-update.component';

describe('DistritoUpdateComponent', () => {
  let component: DistritoUpdateComponent;
  let fixture: ComponentFixture<DistritoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritoUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
