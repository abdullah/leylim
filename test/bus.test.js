/* eslint-disable */
import Bus from '../lib/bus';
var assert = require('assert');
var expect = require('expect.js');
import { rowList } from './mocks/index';

describe('LEYLIM BUS', () => {
  const handler = () => {};

  it('should work Bus subscribe', () => {
    Bus.subscribe(handler);
    expect(Bus.handlers.length > 0).to.be.equal(true);
  });

  it('should work Bus unsubscribe', () => {
    Bus.unsubscribe(handler);
    expect(Bus.handlers.indexOf(handler) == -1).to.be.equal(true);
  });

  it('should work Bus fire', () => {
    expect(Bus.fire).withArgs('ANY_EVENT', null, {}).to.not.throwException();
  });
});
