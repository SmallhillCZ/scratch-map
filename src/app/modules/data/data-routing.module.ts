import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoadDataPageComponent } from "./pages/load-data-page/load-data-page.component";

const routes: Routes = [{ path: "load", component: LoadDataPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {}
