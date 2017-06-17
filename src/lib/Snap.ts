const uuid = require("uuid").v1;
import { Actor } from "./Actor";

export default class Snap {

    readonly id: string
    readonly date: Date
    readonly actorId: string
    readonly actorType: string
    readonly actorVersion: String
    readonly data: any
    // readonly index:number
    // readonly latestEventIndex:number

    /**
     * 
     * id: uuid(),
                        latestEventIndex: lastEvent.index,
                        index: snap.index + 1,
                        date: Date.now(),
                        data: actor.json,
                        actorId: actor.id,
                        actorType: actor.type
     id: uuid(),
                index: 0,
                date: Date.now(),
                data: actor.json,
                actorId: actor.id,
                actorType: actor.type
     */
    constructor(actor: Actor, public readonly index: number = 0, public readonly latestEventIndex: number = 0) {
        this.id = uuid();
        this.date = new Date();
        this.actorId = actor.id;
        this.actorType = actor.type;
        this.actorVersion = actor.version;
        this.data = actor.json;
    }

    get json() {
        let { id, latestEventIndex, date, actorId, actorType, data ,index } = this;
        return { id, latestEventIndex, date, actorId, actorType, data,index };
    }

    static parse(data): Snap {
        let snap = JSON.parse(JSON.stringify(data));
        snap.__proto__ = Snap.prototype;
        return snap;
    }
}