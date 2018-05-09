define(["require","dataSource/model/CustomDataSourceModel","dataSource/enum/connectionTypes","dataSource/enum/mongoJdbcFileSourceTypes","bi/repository/enum/repositoryResourceTypes","restResource!hypermedia/workflows?parentName=admin","underscore","bundle!jasperserver_messages"],function(e){"use strict";var r=e("dataSource/model/CustomDataSourceModel"),o=(e("dataSource/enum/connectionTypes"),e("dataSource/enum/mongoJdbcFileSourceTypes")),i=(e("bi/repository/enum/repositoryResourceTypes"),e("restResource!hypermedia/workflows?parentName=admin")),t=e("underscore"),n=e("bundle!jasperserver_messages"),a=r.extend({fileTypes:["pdf","config"],defaults:function(){var e={};return t.extend(e,r.prototype.defaults,{dataSourceName:"mongoDbJDBCDataSource",fileSourceType:"repository",timeZone:""}),e}(),validation:function(){var e={};return t.extend(e,r.prototype.validation,{serverAddress:[{required:!0,msg:n["ReportDataSourceValidator.error.not.empty.host"]}],portNumber:[{required:!0,msg:n["ReportDataSourceValidator.error.not.empty.server.port"]}],repositoryFileName:[{fn:function(e,r,o){return!o.autoSchemaDefinition&&"repository"===o.fileSourceType&&(t.isNull(e)||t.isUndefined(e)||t.isString(e)&&""===e)?n["fillParameters.error.mandatoryField"]:null}},{fn:function(e,r,o){return o.autoSchemaDefinition||"repository"!==o.fileSourceType||t.isString(e)&&""!==e&&0===e.indexOf("/")?null:n["resource.file.invalid.path"]}}],serverFileName:[{fn:function(e,r,o){return!o.autoSchemaDefinition&&"serverFileSystem"===o.fileSourceType&&(t.isNull(e)||t.isUndefined(e)||t.isString(e)&&""===e)?n["fillParameters.error.mandatoryField"]:null}}]}),e}(),isLocalFileSystemAccessAllowed:function(){return i&&i._embedded&&i._embedded.workflow&&t.find(i._embedded.workflow,function(e){return"serverSettings"===e.name})},parse:function(){var e=r.prototype.parse.apply(this,arguments);if(t.isString(e.fileName)){if(-1!==e.fileName.indexOf("repo:")){var i=e.fileName.split(":");e.fileSourceType=o.REPOSITORY.name,e.repositoryFileName=i[1]}else e.fileSourceType=o.SERVER_FILE_SYSTEM.name,e.serverFileName=e.fileName;delete e.fileName,e.autoSchemaDefinition=!1}else e.autoSchemaDefinition=!0;return e.timezone=e.timeZone,delete e.timeZone,e},toJSON:function(){var e=r.prototype.toJSON.apply(this,arguments);return e.fileName=e.serverFileName,e},customFieldsToJSON:function(e,i){return e.fileSourceType===o.REPOSITORY.name?e.fileName="repo:"+e.repositoryFileName:e.fileSourceType===o.SERVER_FILE_SYSTEM.name&&(e.fileName=e.serverFileName),delete e.repositoryFileName,delete e.serverFileName,e.autoSchemaDefinition&&(delete e.fileName,delete e.fileSourceType),delete e.autoSchemaDefinition,e.timeZone=e.timezone,delete e.timezone,e=r.prototype.customFieldsToJSON.call(this,e,i)},resetValidation:function(){this.validation=t.clone(a.prototype.validation)}});return a});