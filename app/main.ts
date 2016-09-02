// this import should be first in order to load some required settings (like globals and reflect-metadata)
import * as application from "application";
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {NS_HTTP_PROVIDERS} from 'nativescript-angular/http';
// import {HTTP_PROVIDERS} from "@angular/http";

nativeScriptBootstrap(AppComponent, [NS_HTTP_PROVIDERS, APP_ROUTER_PROVIDERS]);