(function(){var b=YAHOO.util.Dom,a=YAHOO.util.Event,c=YAHOO.lang;YAHOO.widget.Toolbar.prototype.addButton=function(j,h){if(!this.get("element")){this._queue[this._queue.length]=["addButton",arguments];return false}if(!this._buttonList){this._buttonList=[]}YAHOO.log("Adding button of type: "+j.type,"info","Toolbar");if(!j.container){j.container=this.get("cont")}if((j.type=="menu")||(j.type=="split")||(j.type=="select")){if(c.isArray(j.menu)){for(var r in j.menu){if(c.hasOwnProperty(j.menu,r)){var x={fn:function(o,i,m){if(!j.menucmd){j.menucmd=j.value}j.value=((m.value)?m.value:m._oText.nodeValue)},scope:this};j.menu[r].onclick=x}}}}var s={},p=false;for(var l in j){if(c.hasOwnProperty(j,l)){if(!this._toolbarConfigs[l]){s[l]=j[l]}}}if(j.type=="select"){s.type="menu"}if(j.type=="spin"){s.type="push"}if(s.type=="color"){if(YAHOO.widget.Overlay){s=this._makeColorButton(s)}else{p=true}}if(s.menu){if((YAHOO.widget.Overlay)&&(j.menu instanceof YAHOO.widget.Overlay)){j.menu.showEvent.subscribe(function(){this._button=s})}else{for(var q=0;q<s.menu.length;q++){if(!s.menu[q].value){s.menu[q].value=s.menu[q].text}}if(this.browser.webkit){s.focusmenu=false}}}if(p){j=false}else{this._configs.buttons.value[this._configs.buttons.value.length]=j;var v=new this.buttonType(s);v.get("element").tabIndex="-1";v.get("element").setAttribute("role","button");v._selected=true;if(this.get("disabled")){v.set("disabled",true)}if(!j.id){j.id=v.get("id")}YAHOO.log("Button created ("+j.type+")","info","Toolbar");if(h){var e=v.get("element");var n=null;if(h.get){n=h.get("element").nextSibling}else{if(h.nextSibling){n=h.nextSibling}}if(n){n.parentNode.insertBefore(e,n)}}v.addClass(this.CLASS_PREFIX+"-"+v.get("value"));var u=document.createElement("span");u.className=this.CLASS_PREFIX+"-icon";v.get("element").insertBefore(u,v.get("firstChild"));if(v._button.tagName.toLowerCase()=="button"){v.get("element").setAttribute("unselectable","on");var w=document.createElement("a");w.innerHTML=v._button.innerHTML;w.href="#";w.tabIndex="-1";a.on(w,"click",function(i){a.stopEvent(i)});v._button.parentNode.replaceChild(w,v._button);v._button=w}if(j.type=="select"){if(v._button.tagName.toLowerCase()=="select"){u.parentNode.removeChild(u);var f=v._button,t=v.get("element");t.parentNode.replaceChild(f,t);v._configs.element.value=f}else{v.addClass(this.CLASS_PREFIX+"-select")}}if(j.type=="spin"){if(!c.isArray(j.range)){j.range=[10,100]}this._makeSpinButton(v,j)}v.get("element").setAttribute("title",v.get("label"));if(j.type!="spin"){if((YAHOO.widget.Overlay)&&(s.menu instanceof YAHOO.widget.Overlay)){var g=function(o){var i=true;if(o.keyCode&&(o.keyCode==9)){i=false}if(i){if(this._colorPicker){this._colorPicker._button=j.value}var m=v.getMenu().element;if(b.getStyle(m,"visibility")=="hidden"){v.getMenu().show()}else{v.getMenu().hide()}}YAHOO.util.Event.stopEvent(o)};v.on("mousedown",g,j,this);v.on("keydown",g,j,this)}else{if((j.type!="menu")&&(j.type!="select")){v.on("keypress",this._buttonClick,j,this);v.on("mousedown",function(i){YAHOO.util.Event.stopEvent(i);this._buttonClick(i,j)},j,this);v.on("click",function(i){YAHOO.util.Event.stopEvent(i)})}else{v.on("mousedown",function(i){});v.on("click",function(i){});v.on("change",function(i){if(!i.target){if(!j.menucmd){j.menucmd=j.value}j.value=i.value;this._buttonClick(i,j)}},this,true);var k=this;v.on("appendTo",function(){var i=this;if(i.getMenu()&&i.getMenu().mouseDownEvent){i.getMenu().mouseDownEvent.subscribe(function(y,o){YAHOO.log("mouseDownEvent","warn","Toolbar");var m=o[1];YAHOO.util.Event.stopEvent(o[0]);i._onMenuClick(o[0],i);if(!j.menucmd){j.menucmd=j.value}j.value=((m.value)?m.value:m._oText.nodeValue);k._buttonClick.call(k,o[1],j);i._hideMenu();return false});i.getMenu().clickEvent.subscribe(function(o,m){YAHOO.log("clickEvent","warn","Toolbar");YAHOO.util.Event.stopEvent(m[0])});i.getMenu().mouseUpEvent.subscribe(function(o,m){YAHOO.log("mouseUpEvent","warn","Toolbar");YAHOO.util.Event.stopEvent(m[0])})}})}}}else{v.on("mousedown",function(i){YAHOO.util.Event.stopEvent(i)});v.on("click",function(i){YAHOO.util.Event.stopEvent(i)})}if(this.browser.ie){}if(this.browser.webkit){v.hasFocus=function(){return true}}this._buttonList[this._buttonList.length]=v;if((j.type=="menu")||(j.type=="split")||(j.type=="select")){if(c.isArray(j.menu)){YAHOO.log("Button type is ("+j.type+"), doing extra renderer work.","info","Toolbar");var d=v.getMenu();if(d&&d.renderEvent){d.renderEvent.subscribe(this._addMenuClasses,v);if(j.renderer){d.renderEvent.subscribe(j.renderer,v)}}}}}return j}})();