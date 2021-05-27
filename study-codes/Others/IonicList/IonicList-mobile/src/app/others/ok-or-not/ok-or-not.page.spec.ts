import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OkOrNotPage } from './ok-or-not.page';

describe('OkOrNotPage', () => {
  let component: OkOrNotPage;
  let fixture: ComponentFixture<OkOrNotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkOrNotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OkOrNotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
