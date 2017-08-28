/* eslint-disable */
let leylim;

window.onload = () => {
  let components = lComponents;

  // Dummy row data
  const rowList = [
    {
      name: 'l-one-column', // tmp name
      thumbnail: 'l-one.png',
      template: `
        <div class="l-one-column">
          <div class="l-col" contenteditable>
            <h3>Baratheon</h3>
            <p>King Robert I Baratheon was the ruler of the Seven Kingdoms, formally styled as Robert of the House Baratheon, the First of His Name, King of the Andals and the First Men, Lord of the Seven Kingdoms and Protector of the Realm.</p>

            <p>Robert, a great warrior and charismatic man in his youth, took the throne through conquest in the war known as Robert's Rebellion, which began when the Prince of Dragonstone, Rhaegar Targaryen, allegedly abducted Robert's betrothed, Lyanna Stark. Killing Rhaegar at the Battle of the Trident, his climactic duel turned the tides of the war in his favor. After the war and following Lyanna's death, Robert married Cersei Lannister to cement an alliance with House Lannister to hold the kingdoms together, but the marriage was loveless.</p>

            <p>Robert also had two younger brothers, Stannis and Renly. He and Cersei have three children: Joffrey, Myrcella and Tommen. However, unbeknownst to Robert and most of the realm, all three were actually fathered by Cersei's twin brother, Jaime Lannister. On the other hand, Robert had many bastards from other women, including Gendry and Barra.</p>
          </div>
          <div class="l-col" contenteditable>
            <img src="https://www.ablogofthrones.com/wp-content/uploads/2016/03/Robert-Baratheon-Kills-Rhaegar-Targaryen-FEAT.jpg"
              />
          </div>
        </div>
        `,
      style: `
        .l-one-column {
            display: flex;
            flex-flow: wrap;
        }
        .l-col {
          width: 50%;
        }
        .l-col img {
          max-width: 100%
        }
        `
    }
  ];

  const onSave = () => {
    const res = leylim.getRowData();
    for (var ii = 0; ii < res.length; ii++) {
      console.log(`${ii} ROW -> ${res[ii]}`);
    }
  };

  Leylim.use(modal);
  Leylim.use(changeFont);
  Leylim.use(changeColor);

  Leylim.use(editImage, {
    onUploadFile: function(image, cb) {
      var file = image[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        console.log(reader.result);
        cb(reader.result)
      }
      reader.readAsDataURL(file);
    }
  });

  leylim = new Leylim({
    el: '#app',
    thumbnailPath: '../dist/assets/component-images/',
    components,
    rowList,
    buttons: [
      {
        text: 'Save',
        class: 'save-class-example',
        handler: onSave
      }
    ],
    beforeRowUpdate(o) {
      console.log(o.node);
      return o;
    }
  });
};
