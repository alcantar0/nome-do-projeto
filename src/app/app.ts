import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Importação aqui
import { Console } from 'console';



export interface Cliente{
  nome: string;
  tipo: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App implements OnInit {
  protected title = 'nome-do-projeto';

  nome_cliente = '';
  tipo_cliente = ''; // valor padrão

  resposta: Cliente[] = [];
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.fazerRequisicao();
    
  }
  fazerRequisicao() {
const url = 'http://localhost:8080/api/fila';

this.http.get<Cliente[]>(url).subscribe({
  next: (dados) => {
    this.resposta = dados;
  },
  error: (erro) => {
    console.error('Erro na requisição:', erro);
  }
});
}

adicionarPaciente() {
  const url = 'http://localhost:8080/api/fila';
  const novoCliente: Cliente = {
    nome: this.nome_cliente,
    tipo: this.tipo_cliente
  };

  this.http.post<Cliente>(url, novoCliente).subscribe({
    next: () => this.fazerRequisicao(),
    error: (erro) => {
      console.error('Erro ao adicionar paciente:', erro);
    }
  });
}

atenderPaciente() {
  const url = 'http://localhost:8080/api/fila/atender';
  this.http.delete(url).subscribe({
    next: () => this.fazerRequisicao(),
    error: (erro) => {
      console.error('Erro ao atender paciente:', erro);
    }
  });
}
}