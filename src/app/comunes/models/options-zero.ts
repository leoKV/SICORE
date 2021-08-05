export class OptionsZero {
    public method: string;
    public params: object;
    public showInfo: boolean;
    public isSingleResponse: boolean;
    public isFile: boolean;
    public ok: Function;
    public error: Function;
    public fail: Function;
    public headers: Map<string, string>;
    public limpiarMensajes: boolean;
    public showSpinner: boolean;

    constructor(
        public uri
    ) {
        this.method = 'POST';
        this.isSingleResponse = true;
        this.showInfo = false;
        this.isFile = false;
        this.params = null;
        this.ok = null;
        this.error = null;
        this.fail = null;
        this.headers = new Map();
        this.limpiarMensajes = true;
        this.showSpinner = false;
    }
}
