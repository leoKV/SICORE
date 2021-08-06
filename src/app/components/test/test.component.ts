import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { PaginateModel } from "../../comunes/models/paginate.model";
import { ZeroService } from "../../comunes/service/zero.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
})
export class TestComponent implements OnInit {
  paginateTestModel: PaginateModel = new PaginateModel();
  listTest = [];
  loadingTableTest = true;
  listPageSize: number[] = [3, 5, 10, 25, 100];
  listaRangosPredefinidos = { Today: [new Date(), new Date()] };
  fechasIniciales = [new Date(), new Date()];
  listaPlaceHolder: Array<string> = ["Fecha inicio", "Fecha fin"];
  formatoFecha = "DD/MM/YYYY";
  options: FormGroup;
  validateForm!: FormGroup;
  @ViewChild("sidenav", { static: true }) sidenav;

  constructor(public fb: FormBuilder, private zero: ZeroService) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
  }

  ngOnInit(): void {
    this.paginarTest();
    this.validateForm = this.fb.group({
      id: [null, []],
      recurso: [null, []],
      tipo: [null, []],
      method: [null, []],
      proyecto: [null, []],
      aplicaciones: [null, []],
      recursoPadre: [null, []],
    });
  }

  paginarTest(): void {
    console.log("Paginando con opciones:", this.paginateTestModel);
    let scope = this;
    this.loadingTableTest = true;
    this.zero.request({
      uri: environment.uris.test.paginate,
      method: "POST",
      params: scope.paginateTestModel,
      ok: (response) => {
        scope.listTest = response.response.list;
        scope.paginateTestModel.total = response.response.totalItems;
      },
    });

    this.loadingTableTest = false;
  }

  /**
   * @function ordenar
   * @description funcion para ordenar las columnas.
   * @param {key: string; value: string} objEvento - Es la clave y el valor a ordenar.
   */
  ordenar(sortName: string, value: string): void {
    console.log("Ordenando", sortName, value);
    switch (value) {
      case "ascend": {
        this.paginateTestModel.sort[sortName] = "asc";
        break;
      }
      case "descend": {
        this.paginateTestModel.sort[sortName] = "desc";
        break;
      }
      default: {
        break;
      }
    }

    this.paginarTest();
  }

  /**
   * Setea el filtro de fecha CreatedAt
   * @param dates fechas recuperadas en el componente
   */
  setFilterCreatedAt(dates: Date[]) {
    let fechaInicio = new Date(dates[0]);
    fechaInicio.setHours(0, 0, 0, 0);
    let fechaFin = new Date(dates[1]);
    fechaFin.setHours(23, 59, 59, 999);
    this.paginateTestModel.filters.createdAt = {};
    this.paginateTestModel.filters.createdAt.start = fechaInicio;
    this.paginateTestModel.filters.createdAt.end = fechaFin;
  }

  openEditSidenav(item) {
    this.validateForm.get("id").setValue("1");
    this.validateForm.get("tipo").setValue("Tipo 1");
    this.validateForm.get("recurso").setValue("Recurso");
    this.validateForm.get("method").setValue("Metodo 1");
    this.validateForm.get("proyecto").setValue("Proyecto 1... fuego!");
    this.validateForm.get("aplicaciones").setValue("App 2");
    this.validateForm.get("recursoPadre").setValue("Recurso padre 2");
    this.sidenav.toggle();
  }
  resetForm() {
    this.validateForm.reset();
  }
  fnMostrarDetalle(){

  }
  submitForm(){
    
  }
}
