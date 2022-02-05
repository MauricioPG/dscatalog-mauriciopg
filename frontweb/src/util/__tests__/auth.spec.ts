import { hasAnyRoles } from '../auth';
import * as TokenModule from '../token';

describe('hasAnyRoles tests', () => {
   test('Should return true when empty list', () => {
      const result = hasAnyRoles([]);

      expect(result).toEqual(true);
   });

   test('Should return true when user has given role', () => {
      jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
         exp: 0,
         user_name: '',
         authorities: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
      });

      const result = hasAnyRoles(['ROLE_ADMIN']);
      expect(result).toEqual(true);
   });

   test.only('Should return false when user does not have given role', () => {
      jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
         exp: 0,
         user_name: '',
         authorities: ['ROLE_OPERATOR'],
      });

      const result = hasAnyRoles(['ROLE_ADMIN']);
      expect(result).toEqual(false);
   });
});
