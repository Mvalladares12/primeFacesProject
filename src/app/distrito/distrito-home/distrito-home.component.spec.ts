import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoHomeComponent } from './distrito-home.component';

describe('DistritoHomeComponent', () => {
  let component: DistritoHomeComponent;
  let fixture: ComponentFixture<DistritoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
