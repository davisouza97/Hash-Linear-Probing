function Hash(numero) {
    this.lista = new Array(parseInt(numero)); //this == publico/ var == private
    this.size = this.lista.length;
    this.mod = function (indice) {
        return indice % this.size;
    };

    this.add = function (item) {
        var mod = this.mod(item.chave);
        //console.log("mod add ::  " + mod);

        if (mod < 0 || mod >= this.size) {
            return;
        }
        if (this.lista[mod] === undefined) //se vazio
        {
            this.lista[mod] = item;
        } else {

            this.colisao(item);
        }
    };
    this.colisao = function (item) {  //adicionar um controle para evitar loop infinito se a lista estiver cheia 
        var modulo = this.mod(item.chave);
        for (let i = modulo; i < this.size;) {
            if (this.lista[i] != undefined &&this.lista[i].dado === item.dado) {
                console.log("item ja add");
                return;
            }
            if (this.lista[i] === undefined) {
                this.lista[i] = item;
                break;
            }
            if (i === this.size - 1) {
                i = -1;
            }
            i++;
            if (i === modulo) {
                console.log("lista percorrida inteiramente");
                break;
            }
        }
    };
    this.excluir = function (chave) {
        var modulo = this.mod(chave);
        //console.log("mod remoção ::  " + modulo);
        if (modulo < 0 || modulo >= this.size || this.lista[modulo] === undefined) {
            console.log("valor não existe")
            return;
        } else {
            for (let i = this.mod(chave); i < this.size;) {
                if (this.lista[i].chave === chave) {
                    console.log("Remocao" + this.lista[i].chave + "--" + this.lista[i].dado);
                    this.lista[i] = undefined;
                    if (this.lista[i + 1] !== undefined) {
                        this.reposicionar(i, i + 1);
                    }
                    break;
                }
                if (i === this.size - 1) {
                    i = -1;
                }
                i++;
                if (i === modulo) {
                    console.log("lista percorrida inteiramente");
                    break;
                }
            }
        }
    }
    this.reposicionar = function (destino, origem) {
        var posicao = origem;
        if (this.lista[posicao] === undefined) {
            return;
        }
        else {
            if (this.mod(this.lista[posicao].chave) !== posicao) {  //colisao
                this.lista[destino] = this.lista[posicao];
                this.lista[posicao] = undefined;
                return
            }
            if (this.mod(this.lista[posicao].chave) === posicao) { //nao colisao
                this.reposicionar(destino, posicao + 1);
            }
        }
        if (this.lista[posicao + 1] !== undefined) {
            this.reposicionar(posicao, posicao + 1);
        }

    }
}


function Item(chave, nome) {
    this.chave = chave;
    this.dado = nome;
}

var listElement = document.getElementById("lista");
var botao = document.getElementById("botao");
var input1 = document.getElementById("input1");
var id = document.getElementById("input2");
var nome = document.getElementById("input3");
var hash;
function criaLista() {
    if (input1.value != "") {
        console.log(input1.value);
        hash = new Hash(input1.value);
        console.log(hash)
        //https://pt.stackoverflow.com/questions/4605/remover-elemento-da-p%C3%A1gina-com-javascript    
        if (botao.parentNode) {
            botao.parentNode.removeChild(botao);
            input1.parentElement.removeChild(input1);
        }
        renderHash();
    }
}

function renderHash() {
    console.log(hash);

    var tabela = document.getElementById("lista");
    var tamanho = tabela.rows.length;
    for (var index = 0; index < tamanho; index++) {
        tabela.deleteRow(0);
    }

     for (item of hash.lista) {
        var numeroLinhas = tabela.rows.length;
        var linha = tabela.insertRow(numeroLinhas);
        var celula1 = linha.insertCell(0);
        var celula2 = linha.insertCell(1);
        if (item == undefined) {
            celula1.innerHTML = "vazio";
            celula2.innerHTML = "vazio"
        } else {
            celula1.innerHTML = item.dado;
            celula2.innerHTML = item.chave;
        }
    }
}

function add() {
    var campoId = id.value;
    var campoNome = nome.value;
    var item = new Item(campoId, campoNome);
    hash.add(item);
    renderHash();

}

function remove() {
    var vlr = id.value;
    hash.excluir(vlr);
    renderHash();
}
