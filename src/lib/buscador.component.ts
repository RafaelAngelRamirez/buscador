import { Component, OnInit } from '@angular/core';
import {
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'codice-buscador',
  template: `
    <div class="form-row align-items-center">
      <div class="col-auto">
        <label class="sr-only" [for]="id">Buscar por término</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i *ngIf="!cargando" class="fas fa-search"></i>
              <i *ngIf="cargando" class="fas fa-sync fa-spin-fast"></i>
            </div>
          </div>
          <input
            #myInput
            [formControl]="input"
            type="text"
            class="form-control"
            [id]="id"
            placeholder="Buscar por término"
          />
          <div class="input-group-append">
            <div
              (click)="limpiarControl()"
              class="input-group-text pointer bg-danger text-white"
            >
              <i class="fas fa-times-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class BuscadorComponent implements OnInit {
  @Output() termino = new EventEmitter<string>();
  _termino: string;
  @Output('escucharCarga') escuchaDeEstadoDeCarga = new EventEmitter<
    BehaviorSubject<boolean>
  >();

  @Input() encodeURIComponent: boolean = true;
  @Input() tiempoDeEspera = 1300;

  estaCargando = new BehaviorSubject<boolean>(false);

  private _cargando = false;
  public get cargando() {
    return this._cargando;
  }

  id = Math.round(Math.random() * 100000);

  public set cargando(value) {
    // Cuando se pone en true y término está vacio, ponemos un contador.
    // Si el contador llega al tiempo definido, quiere
    // decir que la carga fallo por alguna razón ajena
    // a este componente.

    this.setearContador(value, this._termino);

    this._cargando = value;
  }

  input = new FormControl();
  @ViewChild('myInput') inputEl: ElementRef<HTMLInputElement>;
  // @Output() enfoque = EventEmitter<

  constructor() {}

  ngOnInit(): void {
    this.registrarInput();

    this.escuchaDeEstadoDeCarga.emit(this.estaCargando);
    // Escuchamos por los cambios fuera de este componente.
    this.estaCargando.subscribe((valor) => {
      this.cargando = valor;
    });
  }

  registrarInput() {
    this.input.valueChanges
      .pipe(
        tap((_) => {
          this.cargando = true;
          this.estaCargando.next(true);
        }),
        distinctUntilChanged(),
        debounceTime(this.tiempoDeEspera)
      )
      .subscribe((termino: string) => {
        let terminoLimpio = this.limpiarTermino(termino);
        // Asignamos de nuevo el termino limpio.
        this.input.patchValue(terminoLimpio, {
          emitEvent: false,
        });
        this._termino = terminoLimpio;
        this.termino.emit(
          this.encodeURIComponent
            ? encodeURIComponent(terminoLimpio)
            : terminoLimpio
        );
      });
  }

  enfocar() {
    this.inputEl.nativeElement.focus();
  }

  limpiarTermino(termino: string) {
    let limpio = termino.trim();
    return limpio;
  }

  intervalo: any;
  setearContador(estaCargando: boolean, termino: string) {
    if (estaCargando && termino === '') {
      if (!this.intervalo) {
        this.intervalo = setTimeout(() => {
          this.estaCargando.next(false);
        }, 3000);
      }
    }

    if (!estaCargando) {
      this.intervalo = null;
      clearTimeout(this.intervalo);
      return;
    }
  }

  limpiarControl() {
    if (this.cargando) return;
    this.input.setValue('');
    this.enfocar();
  }
}
