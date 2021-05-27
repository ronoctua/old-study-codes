import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoEditPage } from './todo-edit.page';

describe('TodoEditPage', () => {
  let component: TodoEditPage;
  let fixture: ComponentFixture<TodoEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
