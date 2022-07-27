import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/map/map.module").then((m) => m.MapModule),
  },
  {
    path: "data",
    loadChildren: () =>
      import("./modules/data/data.module").then((m) => m.DataModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
