import { Injectable } from "@angular/core"; //Permite la inyeccion de dependecias
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { OptionsZero } from "../models/options-zero";
import { Globals } from "../components/globals";

//jquery
declare var $: any;

@Injectable()
export class ZeroService {
  constructor(
    public http: HttpClient,
    private global: Globals,
    private translate: TranslateService
  ) {}

  request(optionsParams: any) {
    let defaults = new OptionsZero("");
    let options = Object.assign({}, defaults, optionsParams);
    this.global.loading = options.showSpinner;
    this.showLoading();
    let httpRequest;

    if (options.limpiarMensajes) {
      this.global.error = "";
      this.global.info = "";
    }

    let headerDict = {
      Accept: "application/json;charset=UTF-8",
      "Content-Type": "application/json;charset=UTF-8",
      // Authorization: sToken,
    };

    let headerMerge = Object.assign({}, headerDict, options.headers);

    let headers = new HttpHeaders(headerMerge);
    let extras = {
      headers: headers,
      withCredentials: false,
      params: null,
      responseType: null,
    };

    /* ----------------------------------------------------- */
    if (options.isFile) {
      extras.responseType = options.params.fileType;
      httpRequest = this.http.post(options.uri, options.params, extras);
      httpRequest.subscribe(
        (response: any) => {
          if (options.ok) {
            options.ok(response);
          } else {
            console.log("Debe implementar una funcion personalizada");
          }
        },
        (error: any) => {
          this.hideLoading();
        }
      );
      /* ----------------------------------------------------- */
    } else {
      switch (options.method) {
        case "GET":
          httpRequest = this.http.get(options.uri, extras);
          break;
        case "POST":
          httpRequest = this.http.post(options.uri, options.params, extras);
          break;
        case "PUT":
          httpRequest = this.http.put(options.uri, options.params, extras);
          break;
        case "DELETE":
          httpRequest = this.http.delete(options.uri, extras);
          break;
        default:
          httpRequest = this.http.post(options.uri, options.params, extras);
      }

      httpRequest.subscribe(
        (response) => {
          if (options.isSingleResponse) {
            this.processSingleResponse(response, options);
          } else {
            if (options.ok) {
              options.ok(response);
            }
          }
          this.hideLoading();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.error instanceof ErrorEvent) {
            console.log("Error en la invocacion del servicio - Cliente.");
          } else {
            console.log("Error en servicio");
            if (error.error != null && error.error.responseCode) {
              if (options.error) {
                console.log("options.error(error.error)");
                options.error(error.error);
              } else {
                console.log("processError(error.error)");
                this.processError(error.error);
              }
            } else {
              console.log("processHttpStatus(error)");
              this.processHttpStatus(error, options);
            }
          }
          this.hideLoading();
        }
      );
    }
  }
  processSingleResponse(response: any, options: OptionsZero) {
    if (response.ok) {
      if (options.ok) {
        options.ok(response);
      }
      if (options.showInfo) {
        this.showMessageResponse(response.responseCode);
      }
    } else {
      //si existen validaciones
      if (response.validations && response.validations.length > 0) {
        this.processValidations(response);
      } else {
        if (options.error) {
          options.error(response);
        } else {
          this.processError(response);
        }
      }
    }
  }

  processError(response: any) {
    if (!response.ok && response.responseCode) {
      this.showMessageResponse(response.responseCode);
    }
  }

  processValidations(response: any) {
    for (var i = 0; i < response.validations.length; i++) {
      this.showMessageResponse(response.validations[i]);
    }
  }

  processHttpStatus(error: HttpErrorResponse, params: any) {
    console.log("Opciones: ", params);
    console.log(error);
    if (error.status == 401) {
      //procesando error generico
      this.translate
        .get("HTTP" + error.status, { url: error.url })
        .subscribe((value: string) => {
          this.showWarning(value);
        });
      // window.location.href = environment.uris.comunes.login;
    } else {
      //procesando error generico
      this.translate
        .get("HTTP" + error.status, { url: error.url })
        .subscribe((value: string) => {
          this.showError(value);
        });
    }
  }

  showLoading(): void {}

  hideLoading(): void {}

  closeInfo() {
    this.global.info = "";
  }

  closeError() {
    this.global.error = "";
  }

  private showMessageResponse(responseCode: any): void {
    console.log(responseCode.level);
  }

  private showWarning(message: string) {}

  private showError(message: string) {}
}
