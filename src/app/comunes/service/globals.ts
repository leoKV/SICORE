import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    public loading : boolean = false;
    public error : string;
    public info : string;
    public usuario : string;
}