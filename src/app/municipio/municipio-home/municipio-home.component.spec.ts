import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioHomeComponent } from './municipio-home.component';

describe('MunicipioHomeComponent', () => {
  let component: MunicipioHomeComponent;
  let fixture: ComponentFixture<MunicipioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipioHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
