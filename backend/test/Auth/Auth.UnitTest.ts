import { expect } from 'chai';
import 'mocha';
import { parseUserId } from '../../src/auth/utils';

const token1= `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi0zd2liMHBsdy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVkMmJhMDFiZWI2ODQwYzkzOTVlMmMxIiwiYXVkIjoiMVNqNDJ4dUQwUHF3b0h6YjJpNDdRSzNnb3hOQk5tNHkiLCJpYXQiOjE1OTM1NTMxODAsImV4cCI6MTU5Mzk4NTE4MCwiYXRfaGFzaCI6ImJGUGlyT2l0SDllQnlFdUhQMmZ4YnciLCJub25jZSI6ImNSclJMeFhiTDNJTmsuYVREcFhHLV9pR2hmQVR1TnhrIn0.TBjKt9-R2mXIQs5iIAp5bL-hbe2t9jHaXoxjMqs1E00`
const token2= ""
const token3 = `eyJhbGciOiJIUzI1NiIsInR5cCI.6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
describe('parse userId', () => {

    it('should return correct userId', () => {
      const userId = parseUserId(token1)
      expect(userId).to.equal(`auth0|5ed2ba01beb6840c9395e2c1`);
    });
  
    it('should return null for empty token', () => {
        const userId = parseUserId(token2)
        expect(userId).to.equal(null);
    });

    it('should return null for malformed token', () => {
        const userId = parseUserId(token3)
        expect(userId).to.equal(null);
    });
  
  });