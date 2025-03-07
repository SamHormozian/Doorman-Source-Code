import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviousAttentedEventDetailsPage } from './previous-attented-event-details.page';

describe('PreviousAttentedEventDetailsPage', () => {
  let component: PreviousAttentedEventDetailsPage;
  let fixture: ComponentFixture<PreviousAttentedEventDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousAttentedEventDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviousAttentedEventDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
