import ContactClass from "./contact";

describe("Contact class tests", () => {
  let contact: ContactClass = null;

  beforeEach(() => {
    contact = new ContactClass();
  });

  it("should have a valid constructor", () => {
    expect(contact).not.toBeNull();
  });

  it("should set name correctly through cosntructor", () => {
    contact = new ContactClass("Liz");
    const current: string = contact.name;
    const expected: string = "Liz";
    expect(current).toEqual(expected);
  });

  it("should get and set id conrrectly", () => {
    contact.name = "Liz";
    const current: string = contact.name;
    const expected: string = "Liz";
    expect(current).toEqual(expected);
  });

  it("should get and set id correctly", () => {
    contact.id = 1;
    const current: number = contact.id;
    const expected: number = 1;
    expect(current).toEqual(expected);
  });

  it("should get and set email correctly", () => {
    contact.email = "carlos@gmail.com";
    const current: string = contact.email;
    const expected: string = "carlos@gmail.com";
    expect(current).toEqual(expected);
  });

  it("should get and set number correctly", () => {
    contact.number = "6673196108";
    const current: string = contact.number;
    const expected: string = "6673196108";
    expect(current).toEqual(expected);
  });

  it("should get and set country correctly", () => {
    contact.country = "Mexico";
    const current: string = contact.country;
    const expected: string = "Mexico";
    expect(current).toEqual(expected);
  });

  it("should get and set fvorite correctly", () => {
    contact.favorite = true;
    const current: boolean = contact.favorite;
    const expected: boolean = true;
    expect(current).toEqual(expected);
  });

  afterEach(() => {
    contact = null;
  });
});
