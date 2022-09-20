"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
var MRE = __importStar(require("@microsoft/mixed-reality-extension-sdk"));
var node_fetch_1 = __importDefault(require("node-fetch"));
function sendInfo(_userId, _email) {
    return __awaiter(this, void 0, void 0, function () {
        var obj, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    obj = { id: _userId, email: _email };
                    return [4 /*yield*/, node_fetch_1.default("https://handlers.handf.us/webhook-test/4549864f-0097-4394-a086-69f11a94d93c", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Accept: 'application/json', },
                            body: JSON.stringify(obj)
                        })];
                case 1:
                    response = _a.sent();
                    // eslint-disable-next-line no-console
                    return [2 /*return*/, response.json().then(function () { console.log(response.status); })];
            }
        });
    });
}
var EmailCapture = /** @class */ (function () {
    /**
     * Context Constructor
     */
    function EmailCapture(context, baseUrl) {
        var _this = this;
        this.context = context;
        this.baseUrl = baseUrl;
        // Console debug statements?
        this.DEBUG = true;
        // Internal List of Emails
        this.EmailList = new Map();
        this.position = null;
        this.rotation = null;
        this.scale = null;
        this.buttonActor = null;
        this.labelActor = null;
        this.labelText = "Get Highman merch to your inbox Now!!!!\n↓↓↓↓↓↓↓";
        this.context.onStarted(function () { return _this.init(); });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    //  SIGN UP :: Add your address to the emailing list
    //
    EmailCapture.prototype.signUp = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, userName, _a, emailAddress;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = user.id.toString();
                        userName = user.name.toString();
                        // const spaceId = user.properties["altspacevr-space-id"].toString();
                        // const eventId = user.properties["altspacevr-event-id"];
                        // const isEvent = ( eventId === null ) ? false : true;
                        // const locationId = (isEvent) ? eventId : spaceId
                        if (this.DEBUG) {
                            //console.info("\n\n");
                            //console.info(" >>> DEBUG >>> userId: " + userId);
                            //console.info(" >>> DEBUG >>> spaceId: " + spaceId);
                            //console.info(" >>> DEBUG >>> eventId: " + eventId);
                            //console.info(" >>> DEBUG >>> isEvent: " + isEvent);
                            //console.info(user.context);
                            //console.info(user.properties);
                        }
                        // PROMPT FOR EMAIL
                        _a = this;
                        return [4 /*yield*/, user.prompt("We will send Highsman straight to your inbox\nEnter your email address:", true)];
                    case 1:
                        // PROMPT FOR EMAIL
                        _a.userInput = _b.sent();
                        if (!this.userInput.submitted || this.userInput.text === '') {
                            return [2 /*return*/];
                        }
                        emailAddress = this.userInput.text.toLowerCase();
                        // ADD TO LIST
                        this.EmailList.set(userId, emailAddress);
                        //sendInfo
                        sendInfo(userId, emailAddress);
                        return [4 /*yield*/, user.prompt("You entered: " + emailAddress + "\n\n" + userName)];
                    case 2: 
                    // RETURN
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ///
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //  
    //  INIT APP
    //
    EmailCapture.prototype.init = function () {
        var _this = this;
        this.assets = new MRE.AssetContainer(this.context);
        // xxx;
        // Materials
        this.buttonMaterial = this.assets
            .createMaterial('buttonMaterial', {
            color: { r: 0 / 255, g: 255 / 255, b: 200 / 255, a: 125 / 255 },
            alphaMode: MRE.AlphaMode.Blend
        });
        // Meshes
        this.buttonMesh = this.assets.createBoxMesh('buttonMesh', .15, .15, .15);
        // Create Button
        this.scale = { x: 0.4, y: 0.4, z: 0.4 };
        this.position = { x: 0.0, y: 0.13, z: 0 };
        this.rotation = MRE.Quaternion.FromEulerAngles(0 * MRE.DegreesToRadians, 180 * MRE.DegreesToRadians, 0 * MRE.DegreesToRadians);
        this.buttonActor = MRE.Actor.CreateFromLibrary(this.context, {
            resourceId: "artifact:2088901321275998212", actor: {
                name: 'Rocket',
                grabbable: true,
                collider: { geometry: { shape: MRE.ColliderType.Auto } },
                transform: {
                    local: {
                        position: this.position, rotation: this.rotation, scale: this.scale
                    }
                },
            }
        });
        // this.buttonActor = MRE.Actor.Create(this.context, {
        // 	actor: { 
        // 		name: 'Signup Button', 
        // 		collider: { geometry: { shape: MRE.ColliderType.Auto} },
        // 		transform: { local: { position: this.position, rotation: this.rotation } },
        // 		appearance: { materialId: this.buttonMaterial.id, meshId: this.buttonMesh.id }
        // 	}
        // });
        // Add Text Label
        this.position = { x: 0, y: .35, z: 0 };
        this.rotation = MRE.Quaternion.FromEulerAngles(0 * MRE.DegreesToRadians, -90 * MRE.DegreesToRadians, 0 * MRE.DegreesToRadians);
        this.labelActor = MRE.Actor.Create(this.context, {
            actor: {
                name: 'Button Label',
                transform: { local: { position: this.position, rotation: this.rotation } },
                text: { contents: this.labelText, justify: MRE.TextJustify.Center, anchor: MRE.TextAnchorLocation.MiddleCenter, color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 }, height: 0.035 }
            }
        });
        // On click...
        var buttonBehavior = this.buttonActor.setBehavior(MRE.ButtonBehavior);
        buttonBehavior.onButton('released', function (user) {
            // Trigger signUp() function
            _this.signUp(user);
        });
    };
    return EmailCapture;
}());
exports.default = EmailCapture;
