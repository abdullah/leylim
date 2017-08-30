/* eslint-disable */
import { LEYLIM_ROOT } from '../lib/constant';
import Footer from '../lib/footer';
var assert = require('assert');
var expect = require('expect.js');
import { rowList } from './mocks/index';
import { isElement } from './helper/dom';

describe('LEYLIM FOOTER', () => {
  it('should throw new error when root node is empty', () => {
    expect(() => {
      new Footer({});
    }).to.throwError('Root node not defined');
  });

  it('should render without buttons', () => {
    const footer = new Footer({
      rootNode: `.${LEYLIM_ROOT}`
    });
    expect(footer.options.buttons).to.be.equal(undefined);
  });

  it('should render with buttons', () => {
    const footer = new Footer({
      rootNode: `.${LEYLIM_ROOT}`,
      buttons: [
        {
          btnClass: 'test-class',
          text: 'test button text',
          handler() {}
        }
      ]
    });
    expect(footer.options.buttons.length).to.be.equal(1);
  });

  it('should getButtons gerate buttons node', () => {
    const footer = new Footer({
      rootNode: `.${LEYLIM_ROOT}`
    });

    const buttonsNode = footer.getButtons({
      btnClass: 'test-class',
      text: 'test button text',
      handler() {}
    });

    expect(isElement(buttonsNode)).to.be.equal(true);
  });
});
