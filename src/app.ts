/* eslint-disable max-len */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import fetch from 'node-fetch';
async function sendInfo(_userId: any, _email: string): Promise<any> {
    const obj: any = { id: _userId, email: _email };
    const response = await fetch("https://handlers.handf.us/webhook-test/4549864f-0097-4394-a086-69f11a94d93c", {
        method: 'POST',

        headers: { 'Content-Type': 'application/json', Accept: 'application/json', },
        body: JSON.stringify(obj)
    });

    // eslint-disable-next-line no-console
    return response.json().then(() => { console.log(response.status); });

}



export default class EmailCapture {
    private assets: MRE.AssetContainer;
    private userInput: MRE.DialogResponse;

    // Console debug statements?
    private DEBUG = true;

    // Internal List of Emails
    private EmailList: Map<string, string> = new Map();

    // Buttons
    private buttonMaterial: MRE.Material;
    private position: any = null
    private rotation: any = null
    private scale: any = null
    // Meshes
    private buttonMesh: MRE.Mesh;
    private buttonActor: MRE.Actor = null;
    private labelActor: MRE.Actor = null;
    private labelText = "Get Highman merch to your inbox Now!!!!\n↓↓↓↓↓↓↓"

    /**
     * Context Constructor
     */
    constructor(private context: MRE.Context, private baseUrl: string) {
        this.context.onStarted(() => this.init());
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    //  SIGN UP :: Add your address to the emailing list
    //
    private async signUp(user: MRE.User) {

        // GET CONTEXT
        const userId = user.id.toString();
        const userName = user.name.toString();
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
        this.userInput = await user.prompt("We will send Highsman straight to your inbox\nEnter your email address:", true);
        if (!this.userInput.submitted || this.userInput.text === '') { return; }
        const emailAddress = this.userInput.text.toLowerCase();

        // ADD TO LIST
        this.EmailList.set(userId, emailAddress)
        //sendInfo
        sendInfo(userId, emailAddress)
        // RETURN
        return await user.prompt("You entered: " + emailAddress + "\n\n" + userName);
    }
    ///
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //  
    //  INIT APP
    //
    private init() {
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
        this.scale = { x: 0.4, y: 0.4, z: 0.4 }
        this.position = { x: 0.0, y: 0.13, z: 0 }
        this.rotation = MRE.Quaternion.FromEulerAngles(0 * MRE.DegreesToRadians, 180 * MRE.DegreesToRadians, 0 * MRE.DegreesToRadians)
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
        this.position = { x: 0, y: .35, z: 0 }
        this.rotation = MRE.Quaternion.FromEulerAngles(0 * MRE.DegreesToRadians, -90 * MRE.DegreesToRadians, 0 * MRE.DegreesToRadians)
        this.labelActor = MRE.Actor.Create(this.context, {
            actor: {
                name: 'Button Label',
                transform: { local: { position: this.position, rotation: this.rotation } },
                text: { contents: this.labelText, justify: MRE.TextJustify.Center, anchor: MRE.TextAnchorLocation.MiddleCenter, color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 }, height: 0.035 }
            }
        });

        // On click...
        const buttonBehavior = this.buttonActor.setBehavior(MRE.ButtonBehavior);
        buttonBehavior.onButton('released', (user: any) => {
            // Trigger signUp() function
            this.signUp(user);
        });

    }
}