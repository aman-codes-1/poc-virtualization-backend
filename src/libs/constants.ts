/* eslint-disable max-len */
import * as faker from 'faker';

const name = [...Array(10).keys()].map(() => `${faker.name.firstName()} ${faker.name.lastName()}`);
const phone = [...Array(10).keys()].map(() => faker.helpers.createCard().phone);
const city = [...Array(10).keys()].map(() => faker.helpers.createCard().address.city);
const geolocation = [...Array(10).keys()].map(() => `${faker.helpers.createCard().address.geo.lat} ${faker.helpers.createCard().address.geo.lng}`);
const website = [...Array(10).keys()].map(() => faker.helpers.createCard().website);
const company = [...Array(10).keys()].map(() => faker.helpers.createCard().company.name);
const businessName = [...Array(10).keys()].map(() => faker.helpers.createTransaction().business);
const businessDate = [...Array(10).keys()].map(() => faker.helpers.createTransaction().date);
const businessAmount = [...Array(10).keys()].map(() => faker.helpers.createTransaction().amount);
const accountName = [...Array(10).keys()].map(() => faker.helpers.createTransaction().name);
const accountType = [...Array(10).keys()].map(() => faker.helpers.createTransaction().type);
const accountNumber = [...Array(10).keys()].map(() => faker.helpers.createTransaction().account);

export const initData = [...Array(10).keys()].map((field) => ({
  name: name[field],
  email: faker.internet.email(name[field]),
  phone: phone[field],
  city: city[field],
  geolocation: geolocation[field],
  website: website[field],
  company: company[field],
  fullDetails: [
    {
      businessHistory: {
        name: businessName[field],
        date: businessDate[field],
        amount: businessAmount[field],
      },
      accountHistory: {
        name: accountName[field],
        number: accountNumber[field],
        type: accountType[field],
      },
    },
  ],
  role: 'trainee',
}));

export const DATA_FETCHED_SUCCESSFULLY = 'Data fetched successfully!';
export const NO_MORE_CONTENT = 'No more data to fetch!';
export const NOT_FOUND = 'No such data found!';
export const CREATED_SUCCESSFULLY = 'Data created successfully!';
export const UPDATED_SUCCESSFULLY = 'Data updated successfully!';
export const DELETED_SUCCESSFULLY = 'Data deleted successfully!';
