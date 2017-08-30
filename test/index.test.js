/* eslint-disable */
import Leylim from '../lib/index.js';
import Area from '../lib/area';
import assert from 'assert';
import expect from 'expect.js';
import { rowList } from './mocks/index';

describe('[LEYLIM INDEX]', () => {
  const leylim = new Leylim({
    el: '#app',
    rowList,
    components: [{}]
  });

  it('should perfect render Leylim Instance', () => {
    assert.equal(leylim instanceof Leylim, true);
  });

  it('should perfect work Leylim plugin system without install property', () => {
    Leylim.use({});

    expect(() => {
      new Leylim({
        el: '#app',
        rowList,
        components: [{}]
      });
    }).to.throwError('Plugin must have install method');

    // assert.equal(Leylim._plugins.length, 1);
  });

  it('should perfect work Leylim plugin system', () => {
    Leylim.use({
      install() {}
    });
    assert.equal(Leylim._plugins.length > 0, true);
  });

  it('should must have static button list', () => {
    assert.equal(Leylim.editorButtons.length > 0, true);
  });

  it('should must have static nodes list', () => {
    assert.equal(Object.keys(Leylim.nodes).length > 1, true);
  });

  it('should corrent work getRowData', () => {
    assert.equal(leylim.getRowData().length >= 1, true);
  });

  it('should corrent work saveSelection', () => {
    // assert.equal(.getRowData().length >= 1, true);
    Leylim._plugins = [];
    const leylimInitInstance = new Leylim({
      el: '#app',
      rowList,
      components: [{}],
      thumbnailPath:''
    });
    leylimInitInstance.init();


    expect(leylimInitInstance._area instanceof Area).to.be.equal(true);
  });
});
