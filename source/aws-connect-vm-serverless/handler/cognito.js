!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=911)}({11:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));class r{constructor(e){this.globalRepo=e}getSettings(){return this.globalRepo.getGlobalSettings()}update(e,t,n,r){return this.globalRepo.updateGlobalSettings(e,t,n,r).then(e=>{console.log("Result: "+JSON.stringify(e));let{transcribeVoicemail:t,encryptVoicemail:n,deliveryEmail:r,availableSMSCountries:i}=e.Attributes;return{transcribeVoicemail:t,encryptVoicemail:n,deliveryEmail:r,availableSMSCountries:i}})}createDefault(){return this.globalRepo.createGlobalSettings(!0,!0,process.env.DELIVERY_EMAIL)}}},14:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(4);class i{constructor(e){this.transcribeVoicemail=e.transcribeVoicemail||!1,this.encryptVoicemail=e.encryptVoicemail||!1,this.deliveryEmail=e.deliveryEmail||null,this.availableSMSCountries=e.availableSMSCountries||(process.env.AVAILABLE_SMS_COUNTRIES||"").split(",")}}class s{constructor(){this.dynamo=new r.a(process.env.GLOBAL_TABLE_NAME),this.amazonConnectInstanceArn=process.env.AMAZON_CONNECT_INSTANCE_ARN}getGlobalSettings(){console.log("Getting Global Settings");let e={Key:{instanceArn:this.amazonConnectInstanceArn}};return this.dynamo.getItem(e).then(e=>e?new i(e):null)}createGlobalSettings(e,t,n,r){let s=new i({transcribeVoicemail:e,encryptVoicemail:t,deliveryEmail:n,availableSMSCountries:r});s.instanceArn=this.amazonConnectInstanceArn;let o={Item:s};return console.log("dynamo put"),this.dynamo.put(o).then(()=>s)}updateGlobalSettings(e,t,n,r){return this.getGlobalSettings().then(i=>i?this._updateGlobalSettings(e,t,n,r):(console.log("in create"),this.createGlobalSettings(e,t,n,r)))}_updateGlobalSettings(e,t,n,r){let i={Key:{instanceArn:this.amazonConnectInstanceArn},ExpressionAttributeValues:{":tv":e,":ev":t,":de":n,":ac":r},UpdateExpression:"SET transcribeVoicemail=:tv, encryptVoicemail=:ev, deliveryEmail=:de, availableSMSCountries=:ac"};return this.dynamo.update(i)}}},15:function(e,t){e.exports=require("url")},18:function(e,t){e.exports=require("amazon-cognito-identity-js")},3:function(e,t){e.exports=require("aws-sdk")},4:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));const r=n(3);class i{constructor(e){this.tableName=e,this.client=new r.DynamoDB.DocumentClient}update(e){return e.TableName=this.tableName,e.ReturnValues="ALL_NEW",this.client.update(e).promise()}put(e){return e.TableName=this.tableName,this.client.put(e).promise()}query(e){return e.TableName=this.tableName,this.client.query(e).promise().then(e=>e.Items||null)}scan(e){return e.TableName=this.tableName,this.client.scan(e).promise().then(e=>e.Items||null)}queryWithNext(e){return e.TableName=this.tableName,this.client.query(e).promise().then(e=>{let t={data:e.Items||[]};return e.LastEvaluatedKey&&(t.next=Buffer.from(JSON.stringify(e.LastEvaluatedKey),"utf8").toString("base64")),t})}scanWithNext(e){return e.TableName=this.tableName,this.client.scan(e).promise().then(e=>{let t={data:e.Items||[]};return e.LastEvaluatedKey&&(t.next=Buffer.from(JSON.stringify(e.LastEvaluatedKey),"utf8").toString("base64")),t})}getItem(e,t){return e.TableName=this.tableName,this.client.get(e).promise().then(e=>e.Item||null)}batchWrite(e,t){return new Promise((n,r)=>{this._batchWrite(e,t).then(t=>{e.length>t.index?this.batchWrite(e,t.index).then(e=>{n(e)}):n(t.data)})})}_batchWrite(e,t){return new Promise((n,r)=>{let i=e.length>t+24?t+24:e.length,s=e.slice(t,i),o={RequestItems:{[this.tableName]:s}};this.client.batchWrite(o,(e,r)=>{e&&console.log("Any error? "+JSON.stringify(e,null,2)),n({index:t+24,data:r})})})}}},66:function(e,t){e.exports=require("node-fetch")},8:function(e,t){e.exports=require("https")},911:function(e,t,n){"use strict";n.r(t);const r="SUCCESS",i="FAILED";function s(e,t,r,i,s={},o=!1){return new Promise((a,l)=>{let c="";"FAILED"===r&&(c="See details in CloudWatch Stream "+t.logStreamName);let u=JSON.stringify({Status:r,Reason:c,PhysicalResourceId:i||t.logStreamName,StackId:e.StackId,RequestId:e.RequestId,LogicalResourceId:e.LogicalResourceId,NoEcho:o,Data:s}),m=n(8),d=n(15).parse(e.ResponseURL),h={hostname:d.hostname,port:443,path:d.path,method:"PUT",headers:{"content-type":"","content-length":u.length}},g=m.request(h,e=>{a({statusCode:e.statusCode,statusMessage:e.statusMessage})});g.on("error",e=>{console.log(JSON.stringify(e,null,2)),l("send(..) failed executing https.request(..): "+e)}),g.write(u),g.end()})}var o=n(18);Error;const a=n(3);global.fetch=n(66).default;var l=n(14);const c=new(n(11).a)(new l.a),u=new class{constructor(){this.identityServiceProvider=new a.CognitoIdentityServiceProvider,this.userPoolId=process.env.COGNITO_USER_POOL_ID}adminCreateUser(e,t,n,r,i=!1,s=null){let o={UserPoolId:this.userPoolId,Username:e,DesiredDeliveryMediums:["EMAIL"],ForceAliasCreation:!1,UserAttributes:[{Name:"given_name",Value:t},{Name:"family_name",Value:n},{Name:"email",Value:e},{Name:"email_verified",Value:"true"}]};return s&&(o.TemporaryPassword=s),this.getCognitoUser(e).then(t=>{let n;return n=t&&i?this.adminDeleteUser(e).then(()=>this.identityServiceProvider.adminCreateUser(o).promise()):this.identityServiceProvider.adminCreateUser(o).promise(),n.then(()=>Promise.all(r.split(",").map(t=>this.identityServiceProvider.adminAddUserToGroup({GroupName:t,UserPoolId:this.userPoolId,Username:e}).promise())))})}adminDeleteUser(e){let t={UserPoolId:this.userPoolId,Username:e};return this.identityServiceProvider.adminDeleteUser(t).promise()}refreshToken(e,t,n,r){return new Promise((i,s)=>{const a=new o.CognitoAccessToken({AccessToken:n}),l=new o.CognitoIdToken({IdToken:t}),c=new o.CognitoRefreshToken({RefreshToken:r}),u=new o.CognitoUserSession({IdToken:l,RefreshToken:c,AccessToken:a});if(console.log("Refreshing token",u.isValid()),u.isValid()){new o.CognitoUser({Username:e,Pool:new o.CognitoUserPool(this.poolData)}).refreshSession(c,(e,t)=>{e?s(e):i({idToken:t.getIdToken().getJwtToken(),accessToken:t.getAccessToken().getJwtToken(),refreshToken:t.getRefreshToken().getToken()})})}else s(new Error("InvalidUserSession"))})}getCognitoUser(e){return new Promise((t,n)=>{let r={UserPoolId:this.userPoolId,Username:e};this.identityServiceProvider.adminGetUser(r,(e,n)=>{e&&(console.log(JSON.stringify(e,null,2)),t(null)),t(n)})})}};exports.usersConfig=(e,t)=>{let{ResourceProperties:n,RequestType:o}=e,{AdminEmail:a,AdminFirstName:l,AdminLastName:m,ManagerEmail:d,ManagerFirstName:h,ManagerLastName:g}=n;return"Create"!==o&&"Update"!==o||void 0===a||void 0===d?s(e,t,r,t.logStreamName).then(e=>console.log("Success sending cloudformation result")).catch(e=>console.log("Error sending cloudformation result")):u.adminCreateUser(a,l,m,"Admin,Manager",!0).then(()=>u.adminCreateUser(d,h,g,"Manager",!0)).then(()=>s(e,t,r,t.logStreamName)).then(e=>console.log("Successful send.")).then(()=>c.createDefault()).then(e=>console.log("Successful put!")).catch(n=>(console.log(JSON.stringify(n,null,2)),s(e,t,i,t.logStreamName)))}}}));
//# sourceMappingURL=cognito.js.map