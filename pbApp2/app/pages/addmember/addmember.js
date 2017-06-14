var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var camera = require("nativescript-camera");
var label = require("ui/label");
var image = require("ui/image");
var Observable = require('data/observable');
var ObservableArray = require('data/observable-array');
var imagepickerModule = require("nativescript-imagepicker");
var http = require("http");
var dialogs = require("ui/dialogs");
var fs = require("file-system");
var imageSource = require("image-source")
var bghttp = require("nativescript-background-http");
var appSettings = require("application-settings");
var imageCacheModule = require("ui/image-cache");
var webViewInterfaceModule = require('nativescript-webview-interface');
var oWebViewInterface;

var session = bghttp.session("image-upload");

var page;

var AddMember = function (args) {
    console.log("ok profile page");

};
AddMember.prototype = new BasePage();
AddMember.prototype.constructor = AddMember;

AddMember.prototype.pageLoaded = function (args) {
    page = args.object;
    var wvAddMember = page.getViewById('wvAddMember');
    if (wvAddMember.android) { // in IOS android will be undefined
        wvAddMember.android.getSettings().setBuiltInZoomControls(false);
    }
    oWebViewInterface = new webViewInterfaceModule.WebViewInterface(wvAddMember, '~/www/AddMember.html')
    oWebViewInterface.on('AddMember', function (eventData) {
        console.log(JSON.stringify(eventData));
        var playcentreId = appSettings.getString("PlaycentreId", "");
        if (!global.IsBlank(eventData.Email)) {
            global.CallSecuredApi("/PlaycentreMembers", "PUT", JSON.stringify(eventData), "&playcentreId=" + playcentreId,
                function (result) {
                    topmost().navigate({
                        moduleName: "pages/memberlist/memberlist",
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 380,
                            curve: "easeIn"
                        }
                    });
                },
                function (error) {
                },
                function (apiErrorMessage) {
                });
        }
    });
}

//AddMember.prototype.AddMember = function () {
//    var txtEmail = page.getViewById("txtEmail");
//    var playcentreId = appSettings.getString("PlaycentreId", "");
//    if (!global.IsBlank(txtEmail.text)) {

//    }
//    else {
//        var pnlError = page.getViewById("pnlError");
//        pnlError.visibility = "visible";
//    }
//};

AddMember.prototype.GoBack = function () {
    topmost().navigate({
        moduleName: "pages/memberlist/memberlist",
        animated: true,
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeIn"
        }
    });
};



module.exports = new AddMember();