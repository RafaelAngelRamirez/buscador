import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { BuscadorComponent } from './buscador.component';



@NgModule({
  declarations: [
    BuscadorComponent
  ],
  imports: [
    ReactiveFormsModule
  ],
  exports: [
    BuscadorComponent
  ]
})
export class BuscadorModule { }
