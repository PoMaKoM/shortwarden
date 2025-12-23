import { CanMatchFn } from '@angular/router';

export const authGuard: CanMatchFn = (route, state) => {
  console.warn(`CanMatchFn is not implemented yet!`);

  return true;
};
