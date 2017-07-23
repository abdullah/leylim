!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Leylim=t()}(this,function(){"use strict";var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),n=[],o=function(){function o(){e(this,o)}return t(o,null,[{key:"subscribe",value:function(e){n.push(e)}},{key:"unsubscribe",value:function(e){n=n.filter(function(t){return t!==e})}},{key:"fire",value:function(e,t,o){var i=o||window;n.forEach(function(n){n.call(i,e,t)})}},{key:"handlers",get:function(){return n}}]),o}(),i="leylim-html-mode",a="ADD_COMPONENT",r="DUPLICATE_ROW",c="DELETE_ROW",s=function(){function n(t,o){e(this,n),this.thumbnailPath=o,this.component=t,this.render()}return t(n,[{key:"onclick",value:function(e){e.preventDefault(),o.fire(a,this.component,this)}},{key:"render",value:function(){var e=document.querySelector(".leylim__component-list"),t=document.createElement("a");t.href="#",t.onclick=this.onclick.bind(this),t.classList.add("leylim__list-item"),t.innerHTML='<img src="'+(this.thumbnailPath+this.component.thumbnail)+'" />',e.appendChild(t)}}]),n}(),l=function(){function n(t){e(this,n),this.options=t,this.listNode=null,this.init()}return t(n,[{key:"update",value:function(e){this.options.components=e,this.renderListItem()}},{key:"init",value:function(){var e=this.options.rootNode,t=document.querySelector(e),n=document.createElement("div");n.classList.add("leylim__component-list"),t.appendChild(n),this.listNode=n,this.renderListItem()}},{key:"renderListItem",value:function(){this.listNode.innerHTML="";for(var e=this.options,t=e.components,n=e.thumbnailPath,o=0;o<t.length;o++)new s(t[o],n)}}]),n}(),d=void 0,u={beforeCreate:function(e){return e},created:function(e){return e},beforeRowUpdate:function(e){return e},rowUpdated:function(e){return e},beforeRowDelete:function(e){return e},rowDeleted:function(e){return e},beforeRowDuplicate:function(e){return e},rowDuplicated:function(e){return e},beforeRowAdd:function(e){return e},rowAdded:function(e){return e}},m=function(e){return d=e},h=function(e,t){return d[e](t)},f=0,p=function(){function n(t){var a=this;e(this,n),this.onUpdateRowTemplate=function(){var e=h("beforeRowUpdate",{node:a.templateNode,component:a.component}),t=e.node.innerHTML;a.component=e.component,a.component.template=t,h("rowUpdated",{component:a.component,_uuid:a._uuid})},this.renderContent=function(e){a.rawHTMLmode?(a.templateNode.innerText=a.component.template,a.templateNode.setAttribute("contenteditable",!0),a.templateNode.classList.add(i)):(a.templateNode.innerHTML=a.templateNode.innerText||a.component.template,a.templateNode.setAttribute("contenteditable",!1),a.templateNode.classList.remove(i),e||a.onUpdateRowTemplate(),a.toggleEditable(!0)),a.attachEvents()},this.changeMode=function(e){e.preventDefault();var t=a.actionButtons,n=t.ACTIONS_ACTIVE,o=t.ACTIONS_HTML,i=a.actionsNode.querySelector("."+o);a.rawHTMLmode?i.classList.remove(n):i.classList.add(n),a.rawHTMLmode=!a.rawHTMLmode,a.renderContent()},this.onDuplicate=function(e){e.preventDefault(),o.fire(r,a._uuid)},this.onDelete=function(e){e.preventDefault(),o.fire(c,a._uuid)},this.component=Object.assign({},t),this.rowNode=null,this.templateNode=null,this.actionsNode=null,this.rawHTMLmode=!1,this.actionButtons={ACTIONS_DUPLICATE:"actions--dupicate",ACTIONS_DELETE:"actions--delete",ACTIONS_HTML:"actions--edit",ACTIONS_ACTIVE:"action-active"},this._uuid=f++}return t(n,[{key:"toggleEditable",value:function(e){for(var t=this.templateNode.querySelectorAll("[contenteditable]"),n=0;n<t.length;n++)t[n].setAttribute("contenteditable",e)}},{key:"getRawData",value:function(){this.toggleEditable(!1);var e=this.templateNode.innerHTML;return this.toggleEditable(!0),e}},{key:"attachEvents",value:function(){var e=this,t=this.actionButtons,n=t.ACTIONS_DUPLICATE,o=t.ACTIONS_DELETE,i=t.ACTIONS_HTML,a=this.templateNode.querySelectorAll("[contenteditable]"),r=this.rowNode.querySelector("."+n),c=this.rowNode.querySelector("."+o),s=this.rowNode.querySelector("."+i);a.forEach(function(t){t.onblur=e.onUpdateRowTemplate}),r.onclick=this.onDuplicate,c.onclick=this.onDelete,s.onclick=this.changeMode}},{key:"applyStyle",value:function(){var e=this.component,t=e.name,n=e.style,o="leylim-css-module-"+t;if(o=o.toLowerCase().trim().toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,""),!document.querySelector("#"+o)){var i=document.createElement("STYLE");i.setAttribute("id",o),i.innerHTML=n,document.head.appendChild(i)}}},{key:"render",value:function(){var e=this.actionButtons,t=e.ACTIONS_DUPLICATE,n=e.ACTIONS_DELETE,o=e.ACTIONS_HTML,i=e.ACTIONS_ACTIVE,a=document.querySelector(".leylim__area"),r=document.createElement("div");r.classList.add("leylim-area-row");var c=document.createElement("div");c.classList.add("leylim-area-row__template");var s=document.createElement("div");s.classList.add("leylim-area-row__actions"),s.innerHTML='\n      <a href="#" class="leylim-actions '+t+'"><i class="fa fa-copy"></i></a>\n      <a href="#" class="leylim-actions '+n+'"><i class="fa fa-trash-o"></i></a>\n      <a href="#" class="leylim-actions '+o+" "+(this.rawHTMLmode?i:"")+'"><i class="fa fa-html5"></i></a>\n    ',this.rowNode=r,this.templateNode=c,this.actionsNode=s,r.appendChild(c),r.appendChild(s),a.appendChild(r),this.applyStyle(),this.renderContent(!0),this.attachEvents()}}]),n}(),v=function(e,t){return e.indexOf(t)},y=function(){function n(t){var i=this;e(this,n),this.handleEvents=function(e,t){switch(e){case a:i.addComponent(t);break;case r:i.deleteAndDuplicateRow(t,!0);break;case c:i.deleteAndDuplicateRow(t,!1)}},this.options=t,this.rowList=[],o.subscribe(this.handleEvents),this.generateRow(),this.initArea(),this.render()}return t(n,[{key:"getRowData",value:function(){for(var e=[],t=this.rowList,n=0;n<t.length;n++){var o=t[n].getRawData();e.push(JSON.stringify(o))}return e}},{key:"generateRow",value:function(){for(var e=this.options.rowList,t=0;t<e.length;t++)this.rowList.push(new p(e[t]))}},{key:"deleteAndDuplicateRow",value:function(e,t){var n={},o=this.rowList.filter(function(t){return t._uuid==e})[0],i=v(this.rowList,o);if(n.component=Object.assign({},o.component),t){var a=h("beforeRowDuplicate",n.component);this.rowList.splice(i+1,0,new p(a)),this.render(),h("rowDuplicated",n.component)}else{var r=h("beforeRowDelete",n);this.rowList.splice(i,1),this.render(),h("rowDeleted",r)}}},{key:"addComponent",value:function(e){var t=h("beforeRowAdd",e);this.rowList.push(new p(t)),this.render(),h("rowAdded")}},{key:"initArea",value:function(){var e=this.options.rootNode,t=document.querySelector(e),n=document.createElement("div");n.classList.add("leylim__area"),t.appendChild(n),this.areaNode=n}},{key:"render",value:function(){for(var e=this.areaNode;e.firstChild;)e.removeChild(e.firstChild);if(this.rowList.length)for(var t=0;t<this.rowList.length;t++)this.rowList[t].render(t);else e.innerHTML='<div class="leylim__empty-area"><span>😒</span> </br> No content</div>'}}]),n}(),w=function(){function n(t){e(this,n),this.options=t,this.init()}return t(n,[{key:"getButtons",value:function(e){var t=document.createElement("button");return t.classList.add("leylim__footer-button"),t.classList.add(e.class),t.setAttribute("type","button"),t.innerText=e.text,t.onclick=e.handler,t}},{key:"init",value:function(){var e=this.options,t=e.rootNode,n=e.buttons,o=document.querySelector(t),i=document.createElement("div");i.classList.add("leylim__footer");for(var a=0;a<n.length;a++){var r=this.getButtons(n[a]);i.appendChild(r)}o.appendChild(i)}}]),n}(),L=[{command:"bold",icon:"fa fa-bold"},{command:"italic",icon:"fa fa-italic"},{command:"createLink",icon:"fa fa-link",handler:function(){var e=window.prompt("Please insert a link","http://");document.execCommand("createLink",!0,e)}},{command:"unLink",icon:"fa fa-unlink"},{command:"cut",icon:"fa fa-cut"},{command:"delete",icon:"fa fa-trash-o",handler:function(e){document.execCommand("insertHTML",!0,"<p>"+e.toString()+"</p>")}},{command:"fontName",icon:"fa fa-font",value:"sans",handler:function(e){var t=window.prompt("Please insert font family","sans");document.execCommand("insertHTML",!0,'<span style="font-family: '+t+'">'+e+"</span>")}},{command:"foreColor",icon:"fa fa-paint-brush",value:"yellow",handler:function(e){var t=window.prompt("Please insert color","#000");document.execCommand("insertHTML",!0,'<span style="color: '+t+'">'+e+"</span>")}},{command:"formatBlock",icon:"fa fa-header fa-1",innerText:1,handler:function(e){document.execCommand("insertHTML",!0,"<h1>"+e+"</h1>")}},{command:"formatBlock",icon:"fa fa-header fa-1",innerText:2,handler:function(e){document.execCommand("insertHTML",!0,"<h2>"+e+"</h2>")}},{command:"formatBlock",icon:"fa fa-header fa-1",innerText:3,handler:function(e){document.execCommand("insertHTML",!0,"<h3>"+e+"</h3>")}},{command:"formatBlock",icon:"fa fa-header fa-1",innerText:4,handler:function(e){document.execCommand("insertHTML",!0,"<h4>"+e+"</h4>")}},{command:"formatBlock",icon:"fa fa-header fa-1",innerText:5,handler:function(e){document.execCommand("insertHTML",!0,"<h5>"+e+"</h5>")}},{command:"formatBlock",icon:"fa fa-header fa-1",innerText:6,handler:function(e){document.execCommand("insertHTML",!0,"<h6>"+e+"</h6>")}}],b=function(){function n(t){e(this,n),this.onClick=function(e,t){e.preventDefault(),t.handler?t.handler(window.getSelection()):document.execCommand(t.command,!0,t.value||2)},this.options=t,this.editorNode=null;var o=t.filter?t.filter(L):L;t.merge?this.buttons=o.concat(t.buttons):this.buttons=t.buttons,this.init()}return t(n,[{key:"init",value:function(){var e=this,t=this.buttons,n=document.querySelector(".leylim"),o=document.createElement("div");this.editorNode=o,o.classList.add("leylim-editor");for(var i=0;i<t.length;i++)!function(n){var i=document.createElement("A");i.href="#",i.classList.add("leylim-editor__button"),i.innerHTML='<i class="'+t[n].icon+'"></i>'+(t[n].innerText||""),i.onclick=function(o){return e.onClick(o,t[n])},o.appendChild(i)}(i);n.appendChild(o)}}]),n}();return function(){function n(t){e(this,n),this.options=t;var o=Object.assign({},u,this.options);m(o),h("beforeCreate"),this.init()}return t(n,[{key:"update",value:function(e){var t=e.components;this.options.components=t,this._list.update(t)}},{key:"getRowData",value:function(){return this._area.getRowData()}},{key:"init",value:function(){var e=this.options,t=e.components,n=void 0===t?[]:t,o=e.el,i=e.rowList,a=void 0===i?[]:i,r=e.buttons,c=void 0===r?[]:r,s=e.thumbnailPath,d=void 0===s?"":s,u=e.customEditorButtons,m=void 0===u?{merge:!0,buttons:[]}:u;if(!n.length)throw new Error("Can you give me components? please! If you don't have an idea; https://github.com/abdullah/leylim ");var f=document.querySelector(o),p=document.createElement("div");p.classList.add("leylim"),f.appendChild(p),this._list=new l({rootNode:".leylim",thumbnailPath:d,components:n}),this._footer=new w({rootNode:".leylim",buttons:c}),this._area=new y({rootNode:".leylim",rowList:a}),this._editor=new b({merge:m.merge,buttons:m.buttons,filter:m.filter}),h("created")}}],[{key:"use",value:function(){}}]),n}()});
//# sourceMappingURL=leylim.js.map
