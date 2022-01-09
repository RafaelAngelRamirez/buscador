import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { BuscadorComponent } from './buscador.component';



@NgModule({
  declarations: [
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BuscadorComponent
  ]
})
export class BuscadorModule { }
