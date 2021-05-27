import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListOnePage } from './list-one.page';

describe('ListOnePage', () => {
  let component: ListOnePage;
  let fixture: ComponentFixture<ListOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
