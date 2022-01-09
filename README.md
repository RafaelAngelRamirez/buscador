# Buscador

Buscador limpio y sencillo para Angular.

> Requiere los estilos de bootstrap 4 o 5 para funcionar y para los iconos
> utiliza fontawesome

### Instalación

> `npm i @codice-progressio/buscador`

### Uso

Agrega el buscador en el modulo más alto que lo necesites.

```javascript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, BuscadorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Llama al componente desde donde quieras.

```html
<codice-buscador
  (termino)="buscar($event)"
  (escucharCarga)="escucharCarga = $event"
  [encodeURIComponent]="encodeUriComponent"
  [tiempoDeEspera]="tiempoDeEspera"
></codice-buscador>
```

El componente expulsara el termino

| Directiva          | Dirección | Descripción                                                                                                                            |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| termino            | out       | Arroja el termino limpio que se recibio                                                                                                |
| escucharCarga      | out       | Emite un BehjaivorSubject<boolean> para detener la animación de carga                                                                  |
| encodeUriComponent | input     | Codifica la cadena al regresar el valor por la directiva `termino`                                                                     |
| tiempoDeEspera     | input     | Define el tiempo de espera antes de dejar de capturar lo capturado por el teclado y enviar el valor capturado a la directiva `termino` |
