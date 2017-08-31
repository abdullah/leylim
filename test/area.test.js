/* eslint-disable */
import { LEYLIM_ROOT } from '../lib/constant';
import Area from '../lib/area';
import Leylim from '../lib/index';
var assert = require('assert');
var expect = require('expect.js');
import { rowList } from './mocks/index';

describe('LEYLIM AREA', () => {
  it('should throw new error when root node is empty', () => {
    expect(() => {
      new Area({
        rowList: []
      });
    }).to.throwError('Root node not defined');
  });

  it('should render with empty rowList', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: []
    });
    expect(area.rowList.length == 0).to.be.equal(true);
  });

  it('should render with empty rowList', () => {
    const areaWithRowList = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });

    const rowDataName = JSON.parse(areaWithRowList.getRowData()[0]).name;

    expect(rowDataName == rowList[0].name).to.be.equal(true);
  });

  it('should work deleteAndDuplicateRow method rowList [DUPLICATE]', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });

    const tmpsize = area.rowList.length;
    area.deleteAndDuplicateRow(area.rowList[0]._uuid, true);
    const newSize = area.rowList.length;
    expect(tmpsize < newSize).to.be.equal(true);
  });

  it('should work deleteAndDuplicateRow method rowList [DELETE]', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });

    const tmpsize = area.rowList.length;
    area.deleteAndDuplicateRow(area.rowList[0]._uuid, false);
    const newSize = area.rowList.length;
    expect(tmpsize > newSize).to.be.equal(true);
  });

  it('should work addComponent method rowList', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });

    const tmpsize = area.rowList.length;
    area.addComponent(area.rowList[0]);
    const newSize = area.rowList.length;
    expect(tmpsize < newSize).to.be.equal(true);
  });

  it('should work addComponent method with drop', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });

    Leylim._components = rowList;
    const tmpsize = area.rowList.length;
    area.addComponent(
      {
        componentId: 0,
        rowId: 0,
        before: false
      },
      true
    );
    expect(tmpsize < area.rowList.length).to.be.equal(true);
  });

  it('should work handleEvents [ADD_COMPONENT]', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });
    area.handleEvents('ADD_COMPONENT', rowList[0]);
    expect(area.rowList.length == 2).to.be.equal(true);
  });

  it('should work handleEvents [DUPLICATE_ROW]', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });
    area.handleEvents('DUPLICATE_ROW', area.rowList[0]._uuid);

    expect(
      area.rowList[0].component.template == area.rowList[1].component.template
    ).to.be.equal(true);
  });

  it('should work handleEvents [DELETE_ROW]', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });
    area.handleEvents('DELETE_ROW', area.rowList[0]._uuid);

    expect(area.rowList.length == 0).to.be.equal(true);
  });

  it('should work handleEvents [ADD_COMPONENT_WITH_DRAG_DROP]', () => {
    const area = new Area({
      rootNode: `.${LEYLIM_ROOT}`,
      rowList: rowList
    });
    Leylim._components = rowList;
    const tmpsize = area.rowList.length;
    area.handleEvents('ADD_COMPONENT_WITH_DRAG_DROP', area.rowList[0]._uuid);
    expect(tmpsize < area.rowList.length).to.be.equal(true);
  });
});
