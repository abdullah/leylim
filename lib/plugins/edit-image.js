class MonkButton {
  constructor({ name, className }) {
    this.button = document.createElement('button');
    this.button.innerHTML = name;
    this.button.setAttribute('class', className ? className : '');
    this.button.onclick = this.onclick.bind(this);

    this.image = null;
    return this;
  }
  getButton() {
    return this.button;
  }
  setPosition(node) {
    const { left, top } = node.getBoundingClientRect();
    const { clientHeight, clientWidth } = node;
    const {
      clientHeight: bClientHeight,
      clientWidth: bClientWidth
    } = this.button;

    this.button.style.left = `${left + clientWidth / 2 - bClientWidth / 2}px`;
    this.button.style.top = `${top + clientHeight / 2 - bClientHeight / 2}px`;
  }
  listenArea(areaNode) {
    areaNode.addEventListener('mousemove', e => {
      this.setPosition(e.target);
      if (e.target.tagName === 'IMG') {
        this.image = e.target;
        this.button.style.visibility = 'visible';
      } else {
        this.button.style.visibility = 'hidden';
      }
    });
  }
  onclick() {
    this.onButtonClick(this);
  }
}

export default {
  install(Leylim, options) {
    const { LEYLIM_ROOT, AREA_NODE } = Leylim.nodes;
    const rootNode = document.querySelector(`.${LEYLIM_ROOT}`);
    const area = document.querySelector(`.${AREA_NODE}`);
    const editImage = new MonkButton({ name: 'EDIT', className: 'edit-image' });

    editImage.onButtonClick = ({ image }) => {
      console.log(image);
    };

    rootNode.appendChild(editImage.getButton());
    editImage.listenArea(area);
  }
};

//     this.rootNode = rootNode;
//     this.area = area;
//     this.Leylim = Leylim;
//     this.options = options;
//     this.image = null;
//     this.init();
//     this.listenOnImageMove();
//     this.createModal();
//   },
//   createModal() {
//     this.modal = this.Leylim.$getModal();
//     this.modal.setContent(`
//         <div class="leylim-modal__content">
//         <div class="modal-header">
//           <button type="button" class="close" data-dismiss="modal">&times;</button>
//           <h4 class="modal-title">Modal Header</h4>
//         </div>
//         <div class="modal-body">
//           <p>Some text in the modal.</p>
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
//         </div>
//       </div>
//     `);

//     const closeButton = document.querySelector('.modal-footer button');
//     closeButton.onclick = () => {
//       this.modal.close();
//     };
//   },
//   init() {
//     const button = document.createElement('button');
//     button.setAttribute(
//       'style',
//       ` position: fixed;
//         background-color: #111;
//         border: 0;
//         color: #fff;
//         padding: 20px;
//         top: 0;
//         left: 0;
//         cursor: pointer;
//         visibility: hidden;`
//     );
//     button.innerHTML = 'EDIT';
//     button.onclick = this.onclick.bind(this);
//     this.button = button;
//   },
//   onclick() {
//     this.modal.open();
//   },
//   setPosition(node) {
//     const { left, top } = node.getBoundingClientRect();
//     const { clientHeight, clientWidth } = node;
//     const {
//       clientHeight: bClientHeight,
//       clientWidth: bClientWidth
//     } = this.button;

//     this.button.style.left = `${left + clientWidth / 2 - bClientWidth / 2}px`;
//     this.button.style.top = `${top + clientHeight / 2 - bClientHeight / 2}px`;
//   },
//   listenOnImageMove() {
//     const area = this.area;
//     area.addEventListener('mousemove', e => {
//       this.setPosition(e.target);
//       if (e.target.tagName === 'IMG') {
//         this.image = e.target;
//         this.button.style.visibility = 'visible';
//       } else {
//         this.button.style.visibility = 'hidden';
//       }
//     });
//   }
// };
