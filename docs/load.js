
const isGhPages = window.location.host.search('github.io') >= 0;

const leylimJsNode = document.createElement('script');
const leylimCssNode = document.createElement('link');
leylimCssNode.rel = 'stylesheet';

if (isGhPages) {
  leylimJsNode.src = "https://rawgit.com/abdullah/leylim/master/dist/leylim.js";
  leylimCssNode.href = "https://rawgit.com/abdullah/leylim/master/dist/leylim.css";
} else {
  leylimJsNode.src = "../dist/leylim.js";
  leylimCssNode.href = "../dist/leylim.css";
}

document.head.appendChild(leylimJsNode)
document.head.appendChild(leylimCssNode)
