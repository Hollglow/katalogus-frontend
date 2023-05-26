import { faker } from '@faker-js/faker';
import SHA256 from 'crypto-js/sha256';

export const GenerateSalt = () => {
  return faker.random.alpha(8);
}

export const GenerateHash = (pass, salt) => {
  return SHA256(pass + salt).toString();
}

export const GeneratePassword = () => {
  return faker.random.alpha(8);
}