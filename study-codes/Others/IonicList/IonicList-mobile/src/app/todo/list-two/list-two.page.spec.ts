import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListTwoPage } from './list-two.page';

describe('ListTwoPage', () => {
  let component: ListTwoPage;
  let fixture: ComponentFixture<ListTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
