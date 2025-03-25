import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioUpdateComponent } from './municipio-update.component';

describe('MunicipioUpdateComponent', () => {
  let component: MunicipioUpdateComponent;
  let fixture: ComponentFixture<MunicipioUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipioUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
