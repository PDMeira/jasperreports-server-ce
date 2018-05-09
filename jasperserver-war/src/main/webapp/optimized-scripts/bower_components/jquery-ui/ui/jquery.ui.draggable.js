define(["require","./jquery.ui.core","./jquery.ui.mouse","./jquery.ui.widget"],function(t){t("./jquery.ui.core"),t("./jquery.ui.mouse");var e=t("./jquery.ui.widget");return e.widget("ui.draggable",e.ui.mouse,{version:"@VERSION",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var s=this.options;return this.helper||s.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(e(s.iframeFix===!0?"iframe":s.iframeFix).each(function(){e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var s=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,s.cursorAt&&this._adjustOffsetFromHelper(s.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!s.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,s){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!s){var i=this._uiHash();if(this._trigger("drag",t,i)===!1)return this._mouseUp({}),!1;this.position=i.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var s=this,i=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(i=e.ui.ddmanager.drop(this,t)),this.dropped&&(i=this.dropped,this.dropped=!1),"original"!==this.options.helper||e.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!i||"valid"===this.options.revert&&i||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,i)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1):!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(t){var s=this.options,i=e.isFunction(s.helper)?e(s.helper.apply(this.element[0],[t])):"clone"===s.helper?this.element.clone().removeAttr("id"):this.element;return i.parents("body").length||i.appendTo("parent"===s.appendTo?this.element[0].parentNode:s.appendTo),i[0]===this.element[0]||/(fixed|absolute)/.test(i.css("position"))||i.css("position","absolute"),i},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.element.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,s,i,o=this.options;return o.containment?"window"===o.containment?void(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===o.containment?void(this.containment=[0,0,e(document).width()-this.helperProportions.width-this.margins.left,(e(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):o.containment.constructor===Array?void(this.containment=o.containment):("parent"===o.containment&&(o.containment=this.helper[0].parentNode),s=e(o.containment),i=s[0],void(i&&(t="hidden"!==s.css("overflow"),this.containment=[(parseInt(s.css("borderLeftWidth"),10)||0)+(parseInt(s.css("paddingLeft"),10)||0),(parseInt(s.css("borderTopWidth"),10)||0)+(parseInt(s.css("paddingTop"),10)||0),(t?Math.max(i.scrollWidth,i.offsetWidth):i.offsetWidth)-(parseInt(s.css("borderRightWidth"),10)||0)-(parseInt(s.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(i.scrollHeight,i.offsetHeight):i.offsetHeight)-(parseInt(s.css("borderBottomWidth"),10)||0)-(parseInt(s.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=s))):void(this.containment=null)},_convertPositionTo:function(t,s){s||(s=this.position);var i="absolute"===t?1:-1,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:o.scrollTop(),left:o.scrollLeft()}),{top:s.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*i,left:s.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*i}},_generatePosition:function(t){var s,i,o,n,r=this.options,a="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=t.pageX,h=t.pageY;return this.offset.scroll||(this.offset.scroll={top:a.scrollTop(),left:a.scrollLeft()}),this.originalPosition&&(this.containment&&(this.relative_container?(i=this.relative_container.offset(),s=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]):s=this.containment,t.pageX-this.offset.click.left<s[0]&&(l=s[0]+this.offset.click.left),t.pageY-this.offset.click.top<s[1]&&(h=s[1]+this.offset.click.top),t.pageX-this.offset.click.left>s[2]&&(l=s[2]+this.offset.click.left),t.pageY-this.offset.click.top>s[3]&&(h=s[3]+this.offset.click.top)),r.grid&&(o=r.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,h=s?o-this.offset.click.top>=s[1]||o-this.offset.click.top>s[3]?o:o-this.offset.click.top>=s[1]?o-r.grid[1]:o+r.grid[1]:o,n=r.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,l=s?n-this.offset.click.left>=s[0]||n-this.offset.click.left>s[2]?n:n-this.offset.click.left>=s[0]?n-r.grid[0]:n+r.grid[0]:n)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,s,i){return i=i||this._uiHash(),e.ui.plugin.call(this,t,[s,i]),"drag"===t&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,s,i)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,s){var i=e(this).data("ui-draggable"),o=i.options,n=e.extend({},s,{item:i.element});i.sortables=[],e(o.connectToSortable).each(function(){var s=e.data(this,"ui-sortable");s&&!s.options.disabled&&(i.sortables.push({instance:s,shouldRevert:s.options.revert}),s.refreshPositions(),s._trigger("activate",t,n))})},stop:function(t,s){var i=e(this).data("ui-draggable"),o=e.extend({},s,{item:i.element});e.each(i.sortables,function(){this.instance.isOver?(this.instance.isOver=0,i.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"===i.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,o))})},drag:function(t,s){var i=e(this).data("ui-draggable"),o=this;e.each(i.sortables,function(){var n=!1,r=this;this.instance.positionAbs=i.positionAbs,this.instance.helperProportions=i.helperProportions,this.instance.offset.click=i.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(n=!0,e.each(i.sortables,function(){return this.instance.positionAbs=i.positionAbs,this.instance.helperProportions=i.helperProportions,this.instance.offset.click=i.offset.click,this!==r&&this.instance._intersectsWith(this.instance.containerCache)&&e.contains(r.instance.element[0],this.instance.element[0])&&(n=!1),n})),n?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(o).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return s.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=i.offset.click.top,this.instance.offset.click.left=i.offset.click.left,this.instance.offset.parent.left-=i.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=i.offset.parent.top-this.instance.offset.parent.top,i._trigger("toSortable",t),i.dropped=this.instance.element,i.currentItem=i.element,this.instance.fromOutside=i),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),i._trigger("fromSortable",t),i.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var t=e("body"),s=e(this).data("ui-draggable").options;t.css("cursor")&&(s._cursor=t.css("cursor")),t.css("cursor",s.cursor)},stop:function(){var t=e(this).data("ui-draggable").options;t._cursor&&e("body").css("cursor",t._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,s){var i=e(s.helper),o=e(this).data("ui-draggable").options;i.css("opacity")&&(o._opacity=i.css("opacity")),i.css("opacity",o.opacity)},stop:function(t,s){var i=e(this).data("ui-draggable").options;i._opacity&&e(s.helper).css("opacity",i._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var t=e(this).data("ui-draggable");t.scrollParent[0]!==document&&"HTML"!==t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var s=e(this).data("ui-draggable"),i=s.options,o=!1;s.scrollParent[0]!==document&&"HTML"!==s.scrollParent[0].tagName?(i.axis&&"x"===i.axis||(s.overflowOffset.top+s.scrollParent[0].offsetHeight-t.pageY<i.scrollSensitivity?s.scrollParent[0].scrollTop=o=s.scrollParent[0].scrollTop+i.scrollSpeed:t.pageY-s.overflowOffset.top<i.scrollSensitivity&&(s.scrollParent[0].scrollTop=o=s.scrollParent[0].scrollTop-i.scrollSpeed)),i.axis&&"y"===i.axis||(s.overflowOffset.left+s.scrollParent[0].offsetWidth-t.pageX<i.scrollSensitivity?s.scrollParent[0].scrollLeft=o=s.scrollParent[0].scrollLeft+i.scrollSpeed:t.pageX-s.overflowOffset.left<i.scrollSensitivity&&(s.scrollParent[0].scrollLeft=o=s.scrollParent[0].scrollLeft-i.scrollSpeed))):(i.axis&&"x"===i.axis||(t.pageY-e(document).scrollTop()<i.scrollSensitivity?o=e(document).scrollTop(e(document).scrollTop()-i.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<i.scrollSensitivity&&(o=e(document).scrollTop(e(document).scrollTop()+i.scrollSpeed))),i.axis&&"y"===i.axis||(t.pageX-e(document).scrollLeft()<i.scrollSensitivity?o=e(document).scrollLeft(e(document).scrollLeft()-i.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<i.scrollSensitivity&&(o=e(document).scrollLeft(e(document).scrollLeft()+i.scrollSpeed)))),o!==!1&&e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(){var t=e(this).data("ui-draggable"),s=t.options;t.snapElements=[],e(s.snap.constructor!==String?s.snap.items||":data(ui-draggable)":s.snap).each(function(){var s=e(this),i=s.offset();this!==t.element[0]&&t.snapElements.push({item:this,width:s.outerWidth(),height:s.outerHeight(),top:i.top,left:i.left})})},drag:function(t,s){var i,o,n,r,a,l,h,c,p,f,d=e(this).data("ui-draggable"),g=d.options,u=g.snapTolerance,m=s.offset.left,v=m+d.helperProportions.width,P=s.offset.top,b=P+d.helperProportions.height;for(p=d.snapElements.length-1;p>=0;p--)a=d.snapElements[p].left,l=a+d.snapElements[p].width,h=d.snapElements[p].top,c=h+d.snapElements[p].height,a-u>v||m>l+u||h-u>b||P>c+u||!e.contains(d.snapElements[p].item.ownerDocument,d.snapElements[p].item)?(d.snapElements[p].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,t,e.extend(d._uiHash(),{snapItem:d.snapElements[p].item})),d.snapElements[p].snapping=!1):("inner"!==g.snapMode&&(i=Math.abs(h-b)<=u,o=Math.abs(c-P)<=u,n=Math.abs(a-v)<=u,r=Math.abs(l-m)<=u,i&&(s.position.top=d._convertPositionTo("relative",{top:h-d.helperProportions.height,left:0}).top-d.margins.top),o&&(s.position.top=d._convertPositionTo("relative",{top:c,left:0}).top-d.margins.top),n&&(s.position.left=d._convertPositionTo("relative",{top:0,left:a-d.helperProportions.width}).left-d.margins.left),r&&(s.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left)),f=i||o||n||r,"outer"!==g.snapMode&&(i=Math.abs(h-P)<=u,o=Math.abs(c-b)<=u,n=Math.abs(a-m)<=u,r=Math.abs(l-v)<=u,i&&(s.position.top=d._convertPositionTo("relative",{top:h,left:0}).top-d.margins.top),o&&(s.position.top=d._convertPositionTo("relative",{top:c-d.helperProportions.height,left:0}).top-d.margins.top),n&&(s.position.left=d._convertPositionTo("relative",{top:0,left:a}).left-d.margins.left),r&&(s.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left)),!d.snapElements[p].snapping&&(i||o||n||r||f)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,t,e.extend(d._uiHash(),{snapItem:d.snapElements[p].item})),d.snapElements[p].snapping=i||o||n||r||f)}}),e.ui.plugin.add("draggable","stack",{start:function(){var t,s=this.data("ui-draggable").options,i=e.makeArray(e(s.stack)).sort(function(t,s){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(s).css("zIndex"),10)||0)});i.length&&(t=parseInt(e(i[0]).css("zIndex"),10)||0,e(i).each(function(s){e(this).css("zIndex",t+s)}),this.css("zIndex",t+i.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,s){var i=e(s.helper),o=e(this).data("ui-draggable").options;i.css("zIndex")&&(o._zIndex=i.css("zIndex")),i.css("zIndex",o.zIndex)},stop:function(t,s){var i=e(this).data("ui-draggable").options;i._zIndex&&e(s.helper).css("zIndex",i._zIndex)}}),e});