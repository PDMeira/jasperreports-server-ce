define(["require","exports","module","underscore","jquery","./JdbcDataSourceModel","./BaseDataSourceModel","../collection/JdbcDriverCollection","settings!dataSourcePatterns","../enum/connectionTypes","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes","bundle!jasperserver_messages","settings!awsSettings","bundle!jasperserver_config","../util/settingsUtility","xregexp"],function(e,t,r){var i=e("underscore"),s=e("jquery"),n=e("./JdbcDataSourceModel"),a=e("./BaseDataSourceModel"),o=e("../collection/JdbcDriverCollection"),c=e("settings!dataSourcePatterns"),d=e("../enum/connectionTypes"),l=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"),p=e("bundle!jasperserver_messages"),u=e("settings!awsSettings"),y=e("bundle!jasperserver_config"),g=e("../util/settingsUtility"),h=e("xregexp"),m=n.extend({otherDriverIsPresent:!1,type:l.AWS_DATA_SOURCE,defaults:function(){var e={};return i.extend(e,n.prototype.defaults,{dbName:"",dbInstanceIdentifier:"",dbService:"",accessKey:"",secretKey:"",roleArn:"",region:"",credentialsType:"",connectionType:d.AWS}),e}(),validation:function(){var e={};return i.extend(e,{connectionUrl:[{required:!0,msg:p["ReportDataSourceValidator.error.not.empty.reportDataSource.connectionUrl"]},{xRegExpPattern:h(c.forbidWhitespacesPattern),msg:p["ReportDataSourceValidator.error.invalid.chars.reportDataSource.connectionUrl"]}],username:[{required:!0,msg:p["ReportDataSourceValidator.error.not.empty.reportDataSource.username"]}],driverClass:[{required:!0,msg:p["ReportDataSourceValidator.error.not.empty.reportDataSource.driverClass"]},{xRegExpPattern:h(c.forbidWhitespacesPattern),msg:p["ReportDataSourceValidator.error.invalid.chars.reportDataSource.driverClass"]},{fn:function(e,t,r){if(!new RegExp(c.attributePlaceholderPattern).test(e)){var i=this.drivers.getDriverByClass(e);if(!i||!i.get("available"))return p["ReportDataSourceValidator.error.not.empty.reportDataSource.driverNotInstalled"]}}}],dbName:[{required:!0,msg:p["ReportDataSourceValidator.error.not.empty.reportDataSource.dbNameIsEmpty"]}],region:[{required:!0}],accessKey:[{fn:function(e,t,r){if(r.credentialsType===m.credentialsType.AWS&&(i.isNull(e)||i.isUndefined(e)||i.isString(e)&&""===e))return p["fillParameters.error.mandatoryField"]}}],secretKey:[{fn:function(e,t,r){if(r.credentialsType===m.credentialsType.AWS&&(i.isNull(e)||i.isUndefined(e)||i.isString(e)&&""===e))return p["fillParameters.error.mandatoryField"]}}]}),e}(),initialize:function(e,t){a.prototype.initialize.apply(this,arguments);var r=g.deepDefaults(t,{awsSettings:u});this.isNew()?this.set("region",i.first(r.awsSettings.awsRegions)):(this.set("password",y["input.password.substitution"]),this.set("secretKey",y["input.password.substitution"])),this.set("credentialsType",!r.awsSettings.isEc2Instance||r.awsSettings.suppressEc2CredentialsWarnings||""!==this.get("accessKey")?m.credentialsType.AWS:m.credentialsType.EC2),this.initialization=s.Deferred(),this.drivers=new o([],this.options);var n=this;this.drivers.fetch({reset:!0}).done(function(){n.initialization.resolve()}),this.on("change:dbName change:dbPort change:dbHost change:sName change:connectionUrlTemplate",this.updateConnectionUrl),this.on("change:credentialsType",this.changeCredentialsType)},updateConnectionUrl:function(){if(this.get("connectionUrlTemplate")){var e=this.pick(["dbName","dbPort","dbHost","sName"]);e.sName||(e.sName=e.dbName);var t=this.replaceConnectionUrlTemplatePlaceholdersWithValues(this.get("connectionUrlTemplate"),e);this.set("connectionUrl",t)}},changeCredentialsType:function(){this.get("credentialsType")===m.credentialsType.EC2&&this.set({accessKey:"",secretKey:"",roleArn:""})},toJSON:function(){var e=n.prototype.toJSON.apply(this,arguments);return this.options.isEditMode&&e.secretKey===y["input.password.substitution"]&&(e.secretKey=null),e},getFullDbTreePath:function(){return this.get("dbInstanceIdentifier")&&this.get("dbService")?"/"+this.get("dbService")+"/"+this.get("dbInstanceIdentifier"):null}},{credentialsType:{EC2:"ec2",AWS:"aws"}});r.exports=m});