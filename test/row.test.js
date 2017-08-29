/* eslint-disable */
import Row from '../lib/row';
var assert = require('assert');
var expect = require('expect.js');
import { rowList } from './mocks/index';

describe('LEYLIM ROW', () => {
  it('should init Row', () => {
    expect(function() {
      new Row(rowList[0]);
    }).to.be.ok();
  });

  it('should render row with component', () => {
    const row = new Row(rowList[0]);
    row.render();
    expect(typeof row.rowNode == 'object').to.be(true);
  });

  it('should onUpdateRowTemplate function works then render', () => {
    const row = new Row(rowList[0]);
    row.render();
    row.onUpdateRowTemplate();
  });

  it('should work actions [HTML]', () => {
    const row = new Row(rowList[0]);
    row.render();
    const button = row.rowNode.querySelector(`.${row.actionButtons.ACTIONS_HTML}`);
    button.click();
    expect(row.rawHTMLmode).to.be.equal(true);
  });

  it('should work renderContent without initial state', () => {
    const row = new Row(rowList[0]);
    row.render();
    row.renderContent(false);
    expect(row.rawHTMLmode).to.be.equal(false);
  });

});
