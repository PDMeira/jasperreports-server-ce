define(["require","exports","module","jquery","backbone","underscore","../../../common/util/browserDetection","bundle!ScalableInputControlsBundle","../../singleSelect/manager/KeyboardManager","../../scalableList/model/ListWithSelectionModel","../../scalableList/model/listWithNavigationModelTrait","../mixin/scalableListItemHeightCalculationTrait","text!../templates/selectedItemsTemplate.htm","text!../templates/selectedItemsListTemplate.htm","text!../templates/listTemplate.htm","../view/ListViewForSelectedItemsList"],function(e,t,i){var s=e("jquery"),n=e("backbone"),l=e("underscore"),o=e("../../../common/util/browserDetection"),a=e("bundle!ScalableInputControlsBundle"),d=e("../../singleSelect/manager/KeyboardManager"),r=e("../../scalableList/model/ListWithSelectionModel"),h=e("../../scalableList/model/listWithNavigationModelTrait"),c=e("../mixin/scalableListItemHeightCalculationTrait"),u=e("text!../templates/selectedItemsTemplate.htm"),m=e("text!../templates/selectedItemsListTemplate.htm"),w=e("text!../templates/listTemplate.htm"),f=e("../view/ListViewForSelectedItemsList"),p=n.View.extend({className:"jr-mMultiselect-listContainer jr-isInactive jr",events:function(){return{"keydown input":this.keyboardManager.onKeydown,"focus input":"onFocus","blur input":"onBlur","mouseup .jr-mSelectlist-item-delete":"onMouseupOnDeleteButton",mousedown:"onMousedown",mouseup:"onMouseup"}},keydownHandlers:l.extend({65:"onAKey",8:"onDeleteKey",46:"onDeleteKey"},d.prototype.keydownHandlers),initialize:function(e){this.model||(this.model=new n.Model),this.model.set("focused",!1,{silent:!0}),this.template=l.template(u),this.keyboardManager=new d({keydownHandlers:this.keydownHandlers,keydownTimeout:e.keydownTimeout,context:this,deferredKeydownHandler:this.processKeydown,immediateHandleCondition:this.immediateHandleCondition,immediateKeydownHandler:this.immediateKeydownHandler,stopPropagation:!0});var t=r.extend(h);this.listViewModel=e.listViewModel||new t({getData:e.getData,bufferSize:e.bufferSize,loadFactor:e.loadFactor}),this.listView=e.listView||l.extend(new f({el:e.listElement||s(w),model:this.listViewModel,chunksTemplate:e.chunksTemplate,itemsTemplate:e.itemsTemplate||m,scrollTimeout:e.scrollTimeout,lazy:!0,selectedClass:"is-selected",selection:{allowed:!0,multiple:!1}}),c),this.initListeners(),this.render().resize()},initListeners:function(){this.listenTo(this.listView,"active:changed",this.activeChange,this),this.listenTo(this.model,"change:focused",this.focusStateChanged,this),this.listenTo(this.model,"change:disabled",this.changeDisabled,this),this.listenTo(this.listViewModel,"change",this.onModelChange,this)},render:function(){this.listView.undelegateEvents();var e=s(this.template({disabled:this.model.get("disabled"),i18n:a}));return this.$el.empty().append(e).find(".jr-mMultiselect-list").append(this.listView.el),this.listView.render(),this.listView.delegateEvents(),this},renderData:function(){return this.listView.renderData(),this},activeChange:function(e){e?this.listView.scrollTo(e.index):this.listViewModel.clearSelection()},changeDisabled:function(){var e=this.model.get("disabled");e?(this.$el.find("input[type='text']").attr("disabled","disabled"),this.listView.setValue({}),this.listView.activate(void 0)):this.$el.find("input[type='text']").removeAttr("disabled"),this.listView.setDisabled(e)},focusStateChanged:function(){this.model.get("focused")?this.$el.find(".mSelect-svListPlaceholder").addClass("focused"):this.$el.find(".mSelect-svListPlaceholder").removeClass("focused")},onModelChange:function(){this.listViewModel.get("total")?this.listView.$el.show():this.listView.$el.hide()},onFocus:function(){this.model.set("focused",!0)},onBlur:function(){this.preventBlur||this.model.set("focused",!1)},onMouseupOnDeleteButton:function(e){this.onDeleteKey(e)},onMousedown:function(){o.isIPad()||(this.preventBlur=!0,this.model.get("focused")||this.$el.find("input").focus())},onMouseup:function(){this.preventBlur&&(this.$el.find("input").focus(),delete this.preventBlur)},onUpKey:function(e){this.listView.activatePrevious()},onDownKey:function(e){this.listView.getActiveValue()?this.listView.activateNext():this.listView.activateFirst()},onEnterKey:function(e){},onHomeKey:function(e){this.listView.activateFirst()},onEndKey:function(e){this.listView.activateLast()},onPageUpKey:function(e){this.listView.pageUp()},onPageDownKey:function(e){this.listView.pageDown()},onTabKey:function(){},onAKey:function(e){},onDeleteKey:function(e){var t=this.listView.getValue();if(t&&t.length>0){var i=!0;for(var s in t)if(t.hasOwnProperty(s)&&void 0!==t[s]){i=!1;break}i||this.trigger("selection:remove",t)}},fetch:function(e,t){this.listView.setValue({}),this.listView.activate(void 0),this.listView.fetch(e,t)},resize:function(){this.listView.resize()},setDisabled:function(e){this.model.set("disabled",e)},getDisabled:function(){return this.model.get("disabled")},remove:function(){this.listView.remove(),n.View.prototype.remove.call(this)}});i.exports=p});