import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Recado } from '../models/recado';
import { AuthService } from '../services/authService';
import { RecadoService } from '../services/recadoService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {

  recados: Recado[] = [];
  textoNovo = '';
  mensagemErro = '';

  constructor(
    public auth: AuthService,
    private recadoService: RecadoService,
    private router: Router,
  ) {}

  async ngOnInit() {
    const usuario = await this.auth.esperarUsuario();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
    await this.carregar();
  }

  async carregar() {
    this.recados = await this.recadoService.listar();
  }

  async publicar() {
    this.mensagemErro = '';

    if (!this.textoNovo.trim()) {
      this.mensagemErro = 'Escreva um recado antes de publicar.';
      return;
    }

    // nome do Google > e-mail > anônimo — nessa ordem
    const autor = this.auth.usuario?.displayName
      ?? this.auth.usuario?.email
      ?? 'anônimo';

    await this.recadoService.adicionar(this.textoNovo.trim(), autor);
    this.textoNovo = '';
    await this.carregar();
  }
  
  async excluir(id: string) {
    await this.recadoService.remover(id);
    await this.carregar();
  }

  async sair() {
    await this.auth.sair();
    this.router.navigate(['/login']);
  }

  
}