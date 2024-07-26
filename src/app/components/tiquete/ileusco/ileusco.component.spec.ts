import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IleuscoComponent } from './ileusco.component';

describe('IleuscoComponent', () => {
  let component: IleuscoComponent;
  let fixture: ComponentFixture<IleuscoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IleuscoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IleuscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
