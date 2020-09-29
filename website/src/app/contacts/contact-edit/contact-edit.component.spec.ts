import { DebugElement } from "@angular/core"; // like an HTMLElement but for debugging :D
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule } from "@angular/forms";

import {
  Contact,
  ContactService,
  FavoriteIconDirective,
  InvalidEmailModalComponent,
  InvalidPhoneNumberModalComponent,
} from "../shared";
import { AppMaterialModule } from "../../app.material.module";
import { ContactEditComponent } from "./contact-edit.component";

import "../../../material-app-theme.scss";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

describe("ContactEditComponent tests", () => {
  let fixture: ComponentFixture<ContactEditComponent>;
  let component: ContactEditComponent;
  let rootElement: DebugElement;

  const contactServiceStub = {
    contact: {
      id: 1,
      name: "janet",
    },
    save: async function (contact: Contact) {
      component.contact = contact;
    },
    getContact: async function () {
      component.contact = this.contact;
      return this.contact;
    },
    updateContact: async function (contact: Contact) {
      component.contact = contact;
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactEditComponent,
        FavoriteIconDirective,
        InvalidEmailModalComponent,
        InvalidPhoneNumberModalComponent,
      ],
      imports: [
        AppMaterialModule,
        FormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: ContactService, useValue: contactServiceStub }],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          InvalidEmailModalComponent,
          InvalidPhoneNumberModalComponent,
        ],
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  describe("saveContact() test", () => {
    it("should display contact name after contact set", fakeAsync(() => {
      const contact = {
        id: 1,
        name: "lorace",
      };

      component.isLoading = false;
      component.saveContact(contact);
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css(".contact-name"));
      tick();
      const current = nameInput.nativeElement.value;
      const expected = 'lorace';
      expect(current).toBe(expected);
    }));
  });

  describe('loadContact() test', () => {
      it('should load contact', fakeAsync(() => {
          component.isLoading = false;
          component.loadContact();
          fixture.detectChanges();
          const nameInput = rootElement.query(By.css('.contact-name'));
          tick();
          const current = nameInput.nativeElement.value;
          const expected = 'janet';
          expect(current).toBe(expected);
      }));
  });

  describe('updateContact() tests', () => {
      it('should update the contact', fakeAsync(() => {
          const newContact = {
              id: 1,
              name: 'delia',
              email: 'delia@example.com',
              number: '1234567890'
          };

          component.contact = {
              id: 2,
              name: 'rhonda',
              email: 'rhonda@example.com',
              number: '123456789'
          };

          component.isLoading = false;
          fixture.detectChanges();
          const nameInput = rootElement.query(By.css('.contact-name'));
          tick();
          const current = nameInput.nativeElement;
          const expectedBeforeChange = 'rhonda';
          const expectedAfterChange = 'delia';
          expect(current.value).toBe(expectedBeforeChange);
          component.updateContact(newContact);
          fixture.detectChanges();
          tick(100);
          expect(current.value).toBe(expectedAfterChange);
      }));
  });
});
