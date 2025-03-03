import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTaskComponent } from './registrar-task.component';

describe('RegistrarTaskComponent', () => {
  let component: RegistrarTaskComponent;
  let fixture: ComponentFixture<RegistrarTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
