import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RemoveAccountPage } from './remove-account.page';

describe('RemoveAccountPage', () => {
  let component: RemoveAccountPage;
  let fixture: ComponentFixture<RemoveAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
