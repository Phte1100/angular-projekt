import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { KurserComponent } from './kurser/kurser.component';
import { RamschemaComponent } from './ramschema/ramschema.component';

export const routes: Routes = [
    { path: 'index', component: IndexComponent},
    { path: 'kurser', component: KurserComponent},
    { path: 'ramschema', component: RamschemaComponent },
    { path: '', redirectTo: '/index', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}