var toolbarButtonModule={UP:"up",DOWN:"down",OVER:"over",DISABLED:"disabled",PRESSED:"pressed",CONTENT_PREFIX:"toolbar_",MenuClass:"menu vertical dropDown",TOOLBAR_MENU_CLASS:"menu vertical dropDown fitable",ACTION_MODEL_TAG:"adhocActionModel",CAPSULE_PATTERN:"capsule",showButtonMenu:function(t,e){e=jQuery(e);var o=this.CONTENT_PREFIX+e.attr("id"),n="adhocActionModel"==this.ACTION_MODEL_TAG?this.actionModel:this.ACTION_MODEL_TAG;actionModel.showDropDownMenu(t,e,o,this.TOOLBAR_MENU_CLASS,n)},setActionModel:function(t){this.actionModel=t},isToolBarButton:function(t){return t?jQuery(t).hasClass("capsule"):!1},enable:function(t,e){buttonManager.enable(t)},disable:function(t){buttonManager.disable(t)},setButtonState:function(t,e){e?this.enable(t):this.disable(t)}};define("components.toolbarButtons",["jquery","prototype"],function(t){return function(){var e;return e||t.toolbarButtonModule}}(this)),toolbarButtonModule.initialize=function(t){toolbarButtonModule.actionMap=t,jQuery(".toolbar").on("mouseup mouseover mouseout","button",function(t){jQuery(this).prop("disabled")||toolbarButtonModule["mouse"+t.type.substring(5,6).toUpperCase()+t.type.substring(6)+"Handler"](t,this)}),isFirefox()&&jQuery(".toolbar li").each(function(t,e){jQuery(e).css("padding","0 2px")})},toolbarButtonModule.mouseUpHandler=function(t,e){var o=e.className.indexOf("capsule")>=0?toolbarButtonModule.actionMap[e.id]:null;if(o){var n=getAsFunction(o);n(t),t.stopPropagation()}},toolbarButtonModule.mouseOverHandler=function(t,e){e.className.indexOf("capsule")>=0&&e.className.indexOf("mutton")>=0&&!buttonManager.isDisabled(e)&&toolbarButtonModule.showButtonMenu(t.originalEvent,e)},toolbarButtonModule.mouseOutHandler=function(t,e){},define("components.toolbar",["jquery","prototype","utils.common","components.toolbarButtons"],function(t){return function(){var e;return e||t.toolbarButtonModule}}(this));var messageDetailModule={_flowExecutionKey:null,_message:null,toolbar:{_buttons:null,_id:"toolbar",initialize:function(){toolbarButtonModule.initialize({}),this._buttons=document.body.select(layoutModule.TOOLBAR_CAPSULE_PATTERN),this._initEventHandlers()},refresh:function(){this._buttons.each(function(t){toolbarButtonModule.setButtonState(t,!0)}.bind(this))},_initEventHandlers:function(){$(this._id).observe("click",function(t){var e=matchAny(t.element(),[layoutModule.BUTTON_PATTERN],!0);document.location="flow.html?_flowExecutionKey="+messageDetailModule._flowExecutionKey+"&_eventId="+e.identify()}.bindAsEventListener(this))}},initialize:function(t){this._flowExecutionKey=t.flowExecutionKey,this._message=t.message,this._process(),this.toolbar.initialize()},_process:function(){$("subject").update(xssUtil.escape(this._message.subject)),$("date").update(xssUtil.escape(this._message.date)),$("component").update(xssUtil.escape(this._message.component)),$("message").update(xssUtil.escape(this._message.message))}};"undefined"==typeof require&&document.observe("dom:loaded",function(){messageDetailModule.initialize(localContext.initOptions)}),define("messages/details/messageDetails",["prototype","components.toolbar","core.layout"],function(t){return function(){var e;return e||t.messageDetailModule}}(this)),define("messages/details/messageDetailsMain",["require","!domReady","./messageDetails","jrs.configs"],function(t){"use strict";var e=t("!domReady"),o=t("./messageDetails"),n=t("jrs.configs");e(function(){o.initialize(n.messageDetailsInitOptions)})});