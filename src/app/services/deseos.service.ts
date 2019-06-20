import { Injectable } from '@angular/core';
import { ListaItem } from '../models/lista_item.models';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas: Lista [] = [];

  constructor() {
   const lista1 = new Lista ('Recolectar piedras del infinito');
   const lista2 = new Lista ('Héroes a desaparecer');

   this.listas.push ( lista1 , lista2);
   console.log(this.listas);
  }

  crearLista ( titulo: string) {
    const nuevaLista = new Lista (titulo);
    this.listas.push( nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }

  borrarLista(lista: Lista) {
    this.listas.filter( listaData => listaData.id !== lista.id );
    this.guardarStorage();
  }

  guardarStorage () {
    localStorage.setItem( 'data', JSON.stringify( this.listas)); // JSON.stringfy es una función para pasarlo a string
  }
  obtenerLista(id: string | number ) {
    id = Number(id); // de esta manera le decimos que es de tipo number si o si
    return this.listas.find ( listaData => {
      return listaData.id === id;
    });
  }

  cagarStorage () {
    if ( localStorage.getItem( 'data')) {
      this.listas = JSON.parse(localStorage.getItem('data')); // JSON.parse esta función es para pasar de String a listado
       console.log ('este es la transformación de string a array: ' + this.listas);
    } // else no haría falta porque ya de por sí creamos una lista vacía.
  }

}
