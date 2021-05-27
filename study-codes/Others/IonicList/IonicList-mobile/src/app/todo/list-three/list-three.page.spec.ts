import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListThreePage } from './list-three.page';

describe('ListThreePage', () => {
  let component: ListThreePage;
  let fixture: ComponentFixture<ListThreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListThreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
