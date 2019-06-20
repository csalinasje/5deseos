import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
@Input () terminada = true;

  constructor( public deseosService: DeseosService,
               public router: Router,
               private alertCtrl: AlertController) { }

  ngOnInit() {}
  listaSeleccionada ( lista: Lista) {
if ( this.terminada) {
  this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
} else {
  this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
}

    console.log('Esta es mi lista:' + lista);
  }
  borrarLista(lista: Lista) {
    this.deseosService.borrarLista( lista);
  }
  async editarLista ( lista: Lista) {
    const alert = await this.alertCtrl.create ({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeHolder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
         text: 'Cancelar',
         role: 'cancel',
         handler: () => console.log('Cancelar'),
        },
        {
         text: 'Actualizar',
         handler: (data) => {
           console.log(data);
           if ( data.titulo.lenght === 0) {
             return;
           }
           lista.titulo = data.titulo;
           this.deseosService.guardarStorage();
          }
        }
      ]
    });
    alert.present();
  }
}
