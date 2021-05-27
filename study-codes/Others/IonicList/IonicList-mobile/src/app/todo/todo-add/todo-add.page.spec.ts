import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoAddPage } from './todo-add.page';

describe('TodoAddPage', () => {
  let component: TodoAddPage;
  let fixture: ComponentFixture<TodoAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
