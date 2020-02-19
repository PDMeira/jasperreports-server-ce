define(["require","exports","module","jquery","underscore","../../common/util/domUtil","backbone","../../common/logging/logger","../utils/Event","./view/TooltipView","./model/TooltipModel","./enum/tooltipPlacements"],function(t,e,o){var i=t("jquery"),n=t("underscore"),l=t("../../common/util/domUtil"),s=t("backbone"),a=t("../../common/logging/logger"),r=t("../utils/Event"),c=t("./view/TooltipView"),p=t("./model/TooltipModel"),h=t("./enum/tooltipPlacements"),d=a.register("tooltip"),f=s.View.extend({events:{mouseenter:"_onShow",mouseleave:"_onHide"},initialize:function(t){t=t||{},this.options=t,this.log=t.log||d;var e=f.readTooltipDataFromDomElement(this.el);n.isEmpty(e)||(f.areSomeKeysEqual(e,t)&&this.log.warn("The same options found both in constructor and in 'data-' attrs. Don't use both"),t=n.extend(t,e)),this.$container=null,t.container&&(this.$container=i(t.container));var o=t.model||p;this.tooltipModel=new o({offset:t.offset,placement:t.placement,type:t.type,content:f.convertContentToObject({value:t.content,log:this.log})});var l=t.view||c;this.tooltipView=new l({model:this.tooltipModel})},remove:function(){return this.stopListening(),this.tooltipView.remove(),this},show:function(){if(this._updateTooltipData(),this.tooltipModel.get("content")&&!n.isEmpty(this.tooltipModel.get("content")))return i("body").append(this.tooltipView.$el),this.tooltipModel.set({visible:!0}),this._positionTooltip(),this.$container&&this.$container.length>0?this.$container.append(this.tooltipView.$el):this.tooltipView.$el.insertAfter(this.$el),this.tooltipView.position(),this},hide:function(){return this.tooltipModel.set({visible:!1}),this.tooltipView.$el.detach(),this},_updateTooltipData:function(){var t=f.readTooltipDataFromDomElement(this.el);t.container&&(this.$container=i(t.container));var e={};n.isEmpty(t)||(t.placement&&(e.placement=t.placement),t.content&&(e.content=f.convertContentToObject({value:t.content,log:this.log})),t.type&&(e.type=t.type),t.offset&&(e.offset=t.offset)),n.isEmpty(e)||this.tooltipModel.set(e)},_onShow:function(){var t=new r({name:"show:tooltip"});this.trigger(t.name,t),t.isDefaultPrevented()||this.show()},_onHide:function(){var t=new r({name:"hide:tooltip"});this.trigger(t.name,t),t.isDefaultPrevented()||this.hide()},_positionTooltip:function(){var t,e={placements:h,placement:this.tooltipModel.get("placement"),offset:this.tooltipModel.get("offset"),targetRect:this._getPosition(this.$el),tooltipRect:this._getPosition(this.tooltipView.$el),tooltipMargins:l.getMargins(this.tooltipView.$el),tooltipPaddings:l.getPaddings(this.tooltipView.$el)};t=f.getTooltipPosition(e),this.tooltipModel.set("position",t)},_getPosition:function(t){var e=t[0],o="BODY"===e.tagName,l=e.getBoundingClientRect(),s=window.SVGElement&&e instanceof window.SVGElement,a=o?{top:0,left:0}:s?null:t.offset(),r={scroll:o?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},c=o?{width:i(window).width(),height:i(window).height()}:null;return n.extend({},l,r,c,a)}},{PLACEMENTS:h,getTooltipPosition:function(t){var e=0,o=0,i=t.placements,n=t.placement,l=t.targetRect,s=t.tooltipRect,a=t.offset,r=t.tooltipMargins,c=t.tooltipPaddings;switch(n){case i.TOP:e=l.top-s.height,o=l.left+l.width/2-s.width/2;break;case i.LEFT:e=l.top+l.height/2-s.height/2,o=l.left-s.width;break;case i.RIGHT:e=l.top+l.height/2-s.height/2,o=l.left+l.width;break;case i.BOTTOM:e=l.top+l.height,o=l.left+l.width/2-s.width/2;break;case i.BOTTOM_LEFT:e=l.top+l.height,o=l.left-c.left;break;case i.BOTTOM_RIGHT:e=l.top+l.height,o=l.left+l.width-s.width+c.right}return e+=r.top,o+=r.left,e+=a.top,o+=a.left,e=Math.floor(e),o=Math.floor(o),{top:e,left:o}},readTooltipDataFromDomElement:function(t){var e=i(t);e.removeData("jrContent"),e.removeData("jrPlacement"),e.removeData("jrType"),e.removeData("jrOffset"),e.removeData("jrContainer");var o=e.data("jrContent"),n=e.data("jrPlacement"),l=e.data("jrType"),s=e.data("jrOffset"),a=e.data("jrContainer");return o||n||l||s||a?{placement:n,content:o,type:l,offset:s,container:a}:{}},areSomeKeysEqual:function(t,e){return n.intersection(Object.keys(t),Object.keys(e)).length>0},convertContentToObject:function(t){t=t||{};var e=t.value||{},o=t.log,i=n.isString(e)&&0===e.length,l=!n.isUndefined(e.label)||!n.isUndefined(e.text),s=n.isObject(e)&&!l;return n.isUndefined(e)||i||s?o&&o.warn("Can't find anything to display in 'content', tooltip won't be shown"):!n.isObject(e)&&n.isString(e)&&(e={text:e}),e}});f.prototype=n.extend({get placement(){return this.tooltipModel.get("placement")},set placement(t){this.tooltipModel.set("placement",t)},get content(){return this.tooltipModel.get("content")},set content(t){this.tooltipModel.set("content",f.convertContentToObject({value:t,log:this.log}),{validate:!0})},get type(){return this.tooltipModel.get("type")},set type(t){this.tooltipModel.set("type",t)},get offset(){return this.tooltipModel.get("offset")},set offset(t){var e=this.tooltipModel.get("offset");t=n.extend({},e,t),this.tooltipModel.set("offset",t,{validate:!0})}},f.prototype),o.exports=f});