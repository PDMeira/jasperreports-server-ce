define(["require","exports","module","jquery","underscore","common/util/domUtil","backbone","logger","components/utils/Event","./view/TooltipView","./model/TooltipModel","./enum/tooltipPlacements"],function(t,e){"use strict";var o=t("jquery"),i=t("underscore"),n=t("common/util/domUtil"),l=t("backbone"),s=t("logger").register(e),a=t("components/utils/Event"),r=t("./view/TooltipView"),c=t("./model/TooltipModel"),p=t("./enum/tooltipPlacements"),h=l.View.extend({events:{mouseenter:"_onShow",mouseleave:"_onHide"},initialize:function(t){t=t||{},this.options=t,this.log=t.log||s;var e=h.readTooltipDataFromDomElement(this.el);i.isEmpty(e)||(h.areSomeKeysEqual(e,t)&&this.log.warn("The same options found both in constructor and in 'data-' attrs. Don't use both"),t=i.extend(t,e)),this.$container=null,t.container&&(this.$container=o(t.container));var n=t.model||c;this.tooltipModel=new n({offset:t.offset,placement:t.placement,type:t.type,content:h.convertContentToObject({value:t.content,log:this.log})});var l=t.view||r;this.tooltipView=new l({model:this.tooltipModel})},remove:function(){return this.stopListening(),this.tooltipView.remove(),this},show:function(){if(this._updateTooltipData(),this.tooltipModel.get("content")&&!i.isEmpty(this.tooltipModel.get("content")))return o("body").append(this.tooltipView.$el),this.tooltipModel.set({visible:!0}),this._positionTooltip(),this.$container&&this.$container.length>0?this.$container.append(this.tooltipView.$el):this.tooltipView.$el.insertAfter(this.$el),this.tooltipView.position(),this},hide:function(){return this.tooltipModel.set({visible:!1}),this.tooltipView.$el.detach(),this},_updateTooltipData:function(){var t=h.readTooltipDataFromDomElement(this.el);t.container&&(this.$container=o(t.container));var e={};i.isEmpty(t)||(t.placement&&(e.placement=t.placement),t.content&&(e.content=h.convertContentToObject({value:t.content,log:this.log})),t.type&&(e.type=t.type),t.offset&&(e.offset=t.offset)),i.isEmpty(e)||this.tooltipModel.set(e)},_onShow:function(){var t=new a({name:"show:tooltip"});this.trigger(t.name,t),t.isDefaultPrevented()||this.show()},_onHide:function(){var t=new a({name:"hide:tooltip"});this.trigger(t.name,t),t.isDefaultPrevented()||this.hide()},_positionTooltip:function(){var t,e={placements:p,placement:this.tooltipModel.get("placement"),offset:this.tooltipModel.get("offset"),targetRect:this._getPosition(this.$el),tooltipRect:this._getPosition(this.tooltipView.$el),tooltipMargins:n.getMargins(this.tooltipView.$el),tooltipPaddings:n.getPaddings(this.tooltipView.$el)};t=h.getTooltipPosition(e),this.tooltipModel.set("position",t)},_getPosition:function(t){var e=t[0],n="BODY"===e.tagName,l=e.getBoundingClientRect(),s=window.SVGElement&&e instanceof window.SVGElement,a=n?{top:0,left:0}:s?null:t.offset(),r={scroll:n?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},c=n?{width:o(window).width(),height:o(window).height()}:null;return i.extend({},l,r,c,a)}},{PLACEMENTS:p,getTooltipPosition:function(t){var e=0,o=0,i=t.placements,n=t.placement,l=t.targetRect,s=t.tooltipRect,a=t.offset,r=t.tooltipMargins,c=t.tooltipPaddings;switch(n){case i.TOP:e=l.top-s.height,o=l.left+l.width/2-s.width/2;break;case i.LEFT:e=l.top+l.height/2-s.height/2,o=l.left-s.width;break;case i.RIGHT:e=l.top+l.height/2-s.height/2,o=l.left+l.width;break;case i.BOTTOM:e=l.top+l.height,o=l.left+l.width/2-s.width/2;break;case i.BOTTOM_LEFT:e=l.top+l.height,o=l.left-c.left;break;case i.BOTTOM_RIGHT:e=l.top+l.height,o=l.left+l.width-s.width+c.right}return e+=r.top,o+=r.left,e+=a.top,o+=a.left,e=Math.floor(e),o=Math.floor(o),{top:e,left:o}},readTooltipDataFromDomElement:function(t){var e=o(t);e.removeData("jrContent"),e.removeData("jrPlacement"),e.removeData("jrType"),e.removeData("jrOffset"),e.removeData("jrContainer");var i=e.data("jrContent"),n=e.data("jrPlacement"),l=e.data("jrType"),s=e.data("jrOffset"),a=e.data("jrContainer");return i||n||l||s||a?{placement:n,content:i,type:l,offset:s,container:a}:{}},areSomeKeysEqual:function(t,e){return i.intersection(Object.keys(t),Object.keys(e)).length>0},convertContentToObject:function(t){t=t||{};var e=t.value||{},o=t.log,n=i.isString(e)&&0===e.length,l=!i.isUndefined(e.label)||!i.isUndefined(e.text),s=i.isObject(e)&&!l;return i.isUndefined(e)||n||s?o&&o.warn("Can't find anything to display in 'content', tooltip won't be shown"):!i.isObject(e)&&i.isString(e)&&(e={text:e}),e}});return h.prototype=i.extend({get placement(){return this.tooltipModel.get("placement")},set placement(t){this.tooltipModel.set("placement",t)},get content(){return this.tooltipModel.get("content")},set content(t){this.tooltipModel.set("content",h.convertContentToObject({value:t,log:this.log}),{validate:!0})},get type(){return this.tooltipModel.get("type")},set type(t){this.tooltipModel.set("type",t)},get offset(){return this.tooltipModel.get("offset")},set offset(t){var e=this.tooltipModel.get("offset");t=i.extend({},e,t),this.tooltipModel.set("offset",t,{validate:!0})}},h.prototype),h});