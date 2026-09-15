import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [IonicModule, CommonModule] // importações adicionadas
})

export class ProductCardComponent implements OnInit {

  // O @Input serve para passarmos uma informação de um pai para um filho
  @Input() produto?: Produto;

  // O @Output é o contrário: é o filho AVISANDO o pai que algo aconteceu.
  // O <number> diz qual tipo de valor eu vou mandar junto com o aviso.
  @Output() selecionado = new EventEmitter<number>();

  aoClicar() {
    // só aviso se eu realmente tiver um produto na mão
      this.selecionado.emit(this.produto?.id);
  }

  constructor() { }
  ngOnInit() {}
}


