export default {
  name: 'l-two-column', // tmp name
  thumbnail: 'l-two.png',
  template: `
  <div class="l-two-column">
    <div class="l-col" contenteditable>
      <h3>Title</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque rem impedit autem dolor explicabo dolorem adipisci, magnam ipsa sit nostrum nam ipsum dicta neque repellendus nihil cupiditate officiis, consequatur beatae?</p>
    </div>
    <div class="l-col" contenteditable>
      <h3>Title</h3>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam tempore, velit voluptatibus neque quibusdam, repudiandae accusantium aspernatur ipsa, reprehenderit porro repellat impedit. Dolorem adipisci voluptatem natus minima. Ex, perferendis neque.</p>
    </div>
  </div>`,
  style: `.l-two-column {
    display: flex;
  }`
}
