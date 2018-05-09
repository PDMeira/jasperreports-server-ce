define(["require","underscore"],function(e){"use strict";var n=e("underscore"),t=200,i=function(e){return this.initialize(e),this};return n.extend(i.prototype,{systemKeyCodes:[16,17,18,91],keydownHandlers:{38:"onUpKey",40:"onDownKey",13:"onEnterKey",27:"onEscKey",36:"onHomeKey",35:"onEndKey",9:"onTabKey",33:"onPageUpKey",34:"onPageDownKey"},initialize:function(e){n.bindAll(this,"onKeydown"),e.keydownHandlers&&(this.keydownHandlers=e.keydownHandlers),this.stopPropagation=e.stopPropagation,this.keydownTimeout=e.keydownTimeout||t,this.context=e.context,this.deferredKeydownHandler=e.deferredKeydownHandler,this.immediateHandleCondition=e.immediateHandleCondition,this.immediateKeydownHandler=e.immediateKeydownHandler},onKeydown:function(e){this._isSystemKeyPressed(e)||(this._canImmediatelyHandleKeyboardEvent(e)?this._immediatelyHandleKeyboardEvent(e):this.deferredHandleKeyboardEvent(e),this.stopPropagation&&e.stopPropagation())},deferredHandleKeyboardEvent:function(e){this.deferredKeydownHandler&&(this.keydownTimeout>0?(clearTimeout(this.deferredTimeout),this.deferredTimeout=setTimeout(n.bind(this.deferredKeydownHandler,this.context,e),this.keydownTimeout)):this.deferredKeydownHandler.call(this.context,e))},_isSystemKeyPressed:function(e){return n.indexOf(this.systemKeyCodes,e.which)>-1},_immediateHandleCondition:function(e){return this.immediateHandleCondition&&this.immediateHandleCondition.call(this.context,e)},_canImmediatelyHandleKeyboardEvent:function(e){var n=this.keydownHandlers[""+e.which];return n&&"function"==typeof this.context[n]||this._immediateHandleCondition(e)},_immediatelyHandleKeyboardEvent:function(e){var n=this.keydownHandlers[""+e.which];n&&"function"==typeof this.context[n]?this.context[n].call(this.context,e):this._immediateHandleCondition(e)&&this.immediateKeydownHandler&&this.immediateKeydownHandler.call(this.context,e)}}),i});