import Bus from './bus';

export default class ListItem extends Bus {
  constructor(options) {
    super();
    this.options = options;
    this.render();
  }
  render() {
    console.log(this);
  }
}
