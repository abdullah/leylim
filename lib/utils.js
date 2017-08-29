//

export const getIndex = (arr, el) => arr.indexOf(el);

export const createDom = (tag, props, attr) => {
  const node = document.createElement(tag);
  if (attr) {
    for (var key in attr) {
      if (attr.hasOwnProperty(key)) {
        node.setAttribute(key, attr[key]);
      }
    }
  }

  if (props) {
    for (var propKey in props) {
      if (props.hasOwnProperty(propKey)) {
        node[propKey] = props[propKey];
      }
    }
  }

  return node;
};

export const getParents = (node, stopTag) => {
  const parents = [];
  let a = node;
  if (stopTag) {
    while (a.tagName != stopTag) {
      parents.unshift(a);
      a = a.parentNode;
    }
  } else {
    while (a) {
      parents.unshift(a);
      a = a.parentNode;
    }
  }

  return parents;
};
