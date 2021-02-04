let CRUDapp = new function() {

  // Variável "Elemento Global" com Lista de Contatos dentro do APP
  this.contatos = [
    {
      nome: "rinoceronte",
      telefone: "+1 38383838",
      email: "callme@teste.us"
    },
    {
      nome: "rinoceronte2",
      telefone: "+1 222222222",
      email: "callme@teste.us"
    },
    {
      nome: "rinoceronte3",
      telefone: "+1 3333333",
      email: "callme@teste.us"
    }
  ];

  this.el = document.getElementById('contatos'); // Variável Elemento Global

  this.count = function(data) {
    let el = document.getElementById('counter'); // Variável Elemento de Escopo Local
    let name = 'Contatos'; // Variável dentro da função a ser renomeada caso haja contatos

    if (data) {
      if (data > 1) {
        name = 'contatos na sua agenda';
      }
      el.innerHTML = data + ' ' + name ;
    } else {
      el.innerHTML = 'Sem ' + name;
    }
  };

  this.fetchAll = function() {
    let data = ''; // Inicializar Variável de Escopo Local

    if (this.contatos.length > 0) { // Recupera Variável de Contatos Global e faz um loop nos Objetos da Matriz
      for (o = 0; o < this.contatos.length; o++) {
        data += '<tr class="contato">';
        data += '<td class="contato_nome">' + this.contatos[o].nome + '</td>';
        data += '<td class="contato_tel">' + this.contatos[o].telefone + '</td>';
        data += '<td class="contato_email">' + this.contatos[o].email + '</td>';
        data += '<td><button onclick="CRUDapp.edit(' + o + ')">Edit</button></td>'; // Insere botão Edição na própria lista de contatos
        data += '<td><button onclick="CRUDapp.delete(' + o + ')">Delete</button></td>'; //Insere botão Delete na própria lista de contatos
        data += '</tr>';
      }

      // for (const prop in data)
    }
    this.count(this.contatos.length); // Executa o contador
    return this.el.innerHTML = data; // Retorna o input dos dados do laço For() no Elemento Global 'el'
  };

  this.add = function () {
    let el1 = document.getElementById('add-nome');
    let el2 = document.getElementById('add-telefone');
    let el3 = document.getElementById('add-email');
    // Pega as variáveis do campo de input do form
    let nome = el1.value;
    let telefone = el2.value;
    let email = el3.value;

    if (nome && telefone && email != null) {
      // Acrescenta os novos valores na lista global contatos
      this.contatos.push({nome: nome, telefone: telefone, email: email});
      //TESTE DA EDICAO: OK! this.contatos.splice (0, 1, {nome: "eu", telefone: "2", email: "3"});
      // Reseta os campos do input do form
      el1.value = '';
      el2.value = '';
      el3.value = '';
      // Mostra a nova lista
      console.log('Inserçao com sucesso'); // Confirma no console --> *** Retirar depois ****
      this.fetchAll();
    } else {
      alert("Todos os campos devem ser preenchidos");
    }
  };

  this.edit = function (item) {
    let el1 = document.getElementById('edit-name');
    let el2 = document.getElementById('edit-telefone');
    let el3 = document.getElementById('edit-email');
    // Preenche os campos com os valores
    el1.value = this.contatos[item].nome;
    el2.value = this.contatos[item].telefone;
    el3.value = this.contatos[item].email;

    console.log('Item selecionado:' + item); // Retirar

    // Mostra o campo de alteração
    document.getElementById('spoiler').style.display = 'block';
    self = this; // Self vs. this Para retornar objeto da janela atual "window.self"

    document.getElementById('saveEdit').onsubmit = function() {
      // Recebe valor dos novos itens
      let novo_nome = el1.value;
      let novo_telefone = el2.value;
      let novo_email = el3.value;

      let novo_contato =  {
        nome: el1.value,
        telefone: el2.value,
        email: el3.value
      };

      console.log(novo_contato); // Retirar

      if (novo_nome != '' && novo_telefone != '' && novo_email != '') {
        self.contatos[item] = novo_contato;
        // Mostra a nova lista
        self.fetchAll();
        // Esconde o campo
        closeInput();
      } else {
        alert('Todos os campos devem ser preenchidos');
      }
    }
  };

  this.delete = function (item) {
    // Deleta a linha escolhida
    this.contatos.splice(item, 1);
    // Mostra a nova lista
    this.fetchAll();
  };

}

function closeInput() {
  document.getElementById('spoiler').style.display = 'none';
}

CRUDapp.fetchAll();
