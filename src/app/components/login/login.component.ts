import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "src/app/comunes/components/globals";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  passwordOculto = true;
  isCargando = false;

  constructor(private router: Router, private globals: Globals) {
   
  }

  ngOnInit() {}

  fnLogin() {}
}
