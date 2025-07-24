// Função para abrir/fechar o chat
function abrirChat() {
    const chat = document.getElementById('chatBox');
    chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
}

// Função para enviar mensagem no chat
function enviarMensagem() {
    const input = document.getElementById('mensagemInput');
    const texto = input.value.trim();
    if (texto !== '') {
        const mensagens = document.getElementById('chatMensagens');

        const msgUsuario = document.createElement('div');
        msgUsuario.classList.add('mensagem-usuario');
        msgUsuario.textContent = 'Você: ' + texto;
        mensagens.appendChild(msgUsuario);

        const msgBell = document.createElement('div');
        msgBell.classList.add('mensagem-bell');
        msgBell.textContent = 'Bell: Que legal! Já te ajudo com isso 😍';
        mensagens.appendChild(msgBell);

        input.value = '';
        mensagens.scrollTop = mensagens.scrollHeight;
    }
}

// Variáveis do carrinho
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const qtdCarrinho = document.getElementById("quantidade-carrinho");
let carrinho = [];

let desconto = 0; // Inicialmente sem desconto

// Função para aplicar o cupom de desconto
function aplicarCupom() {
    const cupom = document.getElementById('input-cupom').value.trim().toUpperCase(); // Pega o valor do campo e coloca em maiúsculas
    const botaoCupom = document.getElementById('botao-cupom'); // Pega o botão de aplicar cupom

    // Verifica se o cupom foi inserido e aplica o desconto
    if (cupom === 'BELL10') {
        desconto = 10; // Aplica o desconto de 10%
        alert("Cupom aplicado com sucesso! Desconto de 10%.");
    } else {
        desconto = 0; // Se o cupom for inválido, não aplica desconto
        alert("Cupom inválido.");
    }

    atualizarCarrinho();

    // Desabilita o botão e o input do cupom depois de aplicá-lo
    botaoCupom.disabled = true;
    document.getElementById('input-cupom').disabled = true;

    // Atualiza o carrinho imediatamente para refletir o desconto
   
}

// Função para atualizar os elementos do carrinho na tela
function atualizarCarrinho() {
    console.log("Carrinho atualizado com", carrinho.length, "itens");

    // Limpa a lista de itens no carrinho
    listaCarrinho.innerHTML = '';

    let total = 0;

    // Cria e exibe os itens na tela
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        let precoOriginal = item.preco.toFixed(2);
        let precoComDesconto = item.preco;
        
        if (desconto > 0) {
            precoComDesconto = (item.preco * (1 - desconto / 100)).toFixed(2);
        }
        
        li.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" style="width:50px; height:50px; object-fit:cover; border-radius:5px; margin-right:8px;">
            ${item.nome} - 
            ${desconto > 0 
                ? `<span style="text-decoration: line-through; color: gray;">R$ ${precoOriginal}</span> <strong style="color: green;">R$ ${precoComDesconto}</strong>` 
                : `R$ ${precoOriginal}`
            }
            <button onclick="removerItem(${index})" style="background: none; border: none; color: red; font-size: 18px; cursor: pointer; margin-left: 10px;">❌</button>
        `;
        
        listaCarrinho.appendChild(li);

        // Soma o preço dos itens para atualizar o total
        total += item.preco;
    });

    let valorDesconto = 0;

    // Verifica se há desconto e aplica ao total
    if (desconto > 0) {
        valorDesconto = total * (desconto / 100); // Calcula o valor do desconto
        total -= valorDesconto; // Aplica o desconto ao total
    }

    // Exibe o desconto, se houver
    if (desconto > 0) {
        document.getElementById('desconto-aplicado').style.display = 'block';
        document.getElementById('valor-desconto').textContent = valorDesconto.toFixed(2);
    } else {
        document.getElementById('desconto-aplicado').style.display = 'none';
    }

    // Atualiza o total e a quantidade de itens
    totalCarrinho.textContent = total.toFixed(2); // Arredonda para duas casas decimais

    // Atualiza a quantidade de itens no ícone do carrinho
    document.getElementById('quantidade-carrinho').textContent = carrinho.length; // Exibe a quantidade de itens no carrinho
}

// Função para abrir/fechar o carrinho lateral
function toggleCarrinho() {
    const painel = document.getElementById('painelCarrinho');

    // Verifica se o painel está visível e alterna a visibilidade
    if (painel.style.right === '0px') {
        painel.style.right = '-400px';  // Esconde o painel
    } else {
        painel.style.right = '0px';     // Mostra o painel
    }
}

function adicionarAoCarrinhoComTamanho(nome, preco, imagem, seletorId = null) {
    let tamanho = '';

    // Se o seletor de tamanho for passado, então é necessário pegar o tamanho
    if (seletorId) {
        const select = document.getElementById(seletorId);
        tamanho = select.value;

        if (!tamanho) {
            alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
            return;
        }

        // Atualiza o nome do produto para incluir o tamanho
        nome = `${nome} (Tam: ${tamanho})`;
    }

    // Adiciona o item ao carrinho
    const item = {
        nome: nome,
        preco: preco,
        imagem: imagem,
        tamanho: tamanho
    };

    carrinho.push(item);
    atualizarCarrinho();

    // Atualiza a quantidade de itens no ícone do carrinho
    const qtdCarrinho = document.getElementById('quantidade-carrinho');
    qtdCarrinho.textContent = carrinho.length;
}



// Função para remover um item específico do carrinho
function removerItem(index) {
    // Remove o item do array
    carrinho.splice(index, 1);

    // Atualiza a exibição do carrinho na tela
    atualizarCarrinho();

    // Se todos os itens forem removidos, reativa o campo de cupom e o botão
    if (carrinho.length === 0) {
        // Reseta o estado do cupom
        document.getElementById('input-cupom').value = ''; // Limpa o campo de cupom
        document.getElementById('desconto-aplicado').style.display = 'none'; // Esconde a mensagem de desconto
        document.getElementById('valor-desconto').textContent = '0.00'; // Reseta o valor do desconto

        // Reativa o botão de cupom
        document.getElementById('botao-cupom').disabled = false;
        document.getElementById('input-cupom').disabled = false;
    }
}

function limparCarrinho() {
    // Limpa o array do carrinho
    carrinho = [];

    // Reseta o desconto
    desconto = 0;

    atualizarCarrinho();

    // Reseta o estado do cupom
    document.getElementById('input-cupom').value = ''; // Limpa o campo de cupom
    document.getElementById('desconto-aplicado').style.display = 'none'; // Esconde a mensagem de desconto
    document.getElementById('valor-desconto').textContent = '0.00'; // Reseta o valor do desconto

    // Reativa o campo de cupom e o botão
    document.getElementById('botao-cupom').disabled = false;
    document.getElementById('input-cupom').disabled = false;

    // Chama a função de atualizar o carrinho para refletir imediatamente na tela
     // Chama a função para atualizar a interface e limpar a tela
}



// Função para finalizar a compra
function finalizarCompra() {
    alert("Compra finalizada! 🥳 Obrigado por comprar na Bell Store 💖");
    limparCarrinho(); // Limpa o carrinho após a compra
}

function enviarPedidoWhatsApp() {

    if (!confirm("Você já efetuou o pagamento via Pix? Confirma para enviar o pedido.")) {
        return; // Cancela o envio se o cliente clicar "Cancelar"
      }
      
    const endereco = document.getElementById('endereco').value.trim();
    if (endereco === '') {
        alert("Por favor, informe seu endereço antes de enviar o pedido.");
        return;
    }

    let mensagem = `📦 *Novo pedido da Bell Store!*%0A%0A`;
    let total = 0;

    carrinho.forEach((item, index) => {
        const subtotal = item.preco; // Já deve ser preço unitário vezes quantidade se aplicável
        mensagem += `🛍️ Produto ${index + 1}:%0A`;
        mensagem += `📸 ${item.nome}%0A`;
        mensagem += `💰 Preço: R$ ${subtotal.toFixed(2)}%0A%0A`;
        total += subtotal;
    });

    // Aqui você aplica o desconto (ex: 10%)
    const descontoPercentual = 10;
    const valorDesconto = total * (descontoPercentual / 100);
    const totalComDesconto = total - valorDesconto;

    mensagem += `🏠 Endereço: ${endereco}%0A`;
    mensagem += `🔻 Desconto: ${descontoPercentual}% (-R$ ${valorDesconto.toFixed(2)})%0A`;
    mensagem += `🧾 Total com desconto: R$ ${totalComDesconto.toFixed(2)}%0A`;

    const telefoneLoja = '5511947778799';
    const url = `https://wa.me/${telefoneLoja}?text=${mensagem}`;
    window.open(url, '_blank');

    alert("Seu pedido foi enviado! Obrigado por comprar na Bell Store 💖");

     // Opcional: limpa o campo de endereço também
     document.getElementById('endereco').value = '';
    
    limparCarrinho();

    function gerarPixEExibir() {
        const total = calcularTotalComDesconto();
        const chavePix = "sualoja@pix.com.br"; // sua chave Pix real
        const nomeLoja = "Bell Store";
        const cidade = "SAO PAULO";
      
        const codigoPix = gerarPixReal(chavePix, nomeLoja, cidade, total);
        document.getElementById("codigo-pix").value = codigoPix;
        document.getElementById("pix-area").style.display = "block";
      }
      
      function calcularTotalComDesconto() {
        let total = 0;
        carrinho.forEach(item => total += item.preco);
        const descontoPercentual = desconto || 0; // sua variável global desconto
        return total - (total * descontoPercentual / 100);
      }
      
      function copiarPixEEnviar() {
        const pixTextarea = document.getElementById("codigo-pix");
        pixTextarea.select();
        document.execCommand("copy");
        alert("Código Pix copiado!");
      
        const endereco = document.getElementById("endereco").value.trim();
        if (!endereco) {
          alert("Por favor, informe o endereço antes de enviar o pedido.");
          return;
        }
      
        let mensagem = "*🛒 Pedido Bell Store:*\n\n";
        carrinho.forEach((item, i) => {
          mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        });
        const total = calcularTotalComDesconto();
        mensagem += `\n📍 Endereço: ${endereco}`;
        mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;
        mensagem += `\n\n✅ Já realizei o pagamento via Pix, segue o comprovante.`;
      
        const telefoneLoja = "5511947778799"; // seu número
        const url = `https://wa.me/${telefoneLoja}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
      
        limparCarrinho();
        document.getElementById("endereco").value = "";
      }
      
      // Funções que você já tem para gerar Pix e calcular CRC16 (copie da sua implementação atual)
      function gerarPixReal(chavePix, nome, cidade, valor) {
        valor = parseFloat(valor).toFixed(2);
      
        let payload = "";
        payload += "000201"; 
        payload += "26580014BR.GOV.BCB.PIX01";
        payload += "36" + chavePix.length.toString().padStart(2, "0") + chavePix;
        payload += "52040000";
        payload += "5303986";
        payload += "54" + valor.length.toString().padStart(2, "0") + valor;
        payload += "5802BR";
        payload += "59" + nome.length.toString().padStart(2, "0") + nome;
        payload += "60" + cidade.length.toString().padStart(2, "0") + cidade;
        payload += "62070503***";
        payload += "6304";
      
        const crc = calcularCRC(payload);
        return payload + crc;
      }
      
      function calcularCRC(str) {
        let crc = 0xFFFF;
        for (let i = 0; i < str.length; i++) {
          crc ^= str.charCodeAt(i) << 8;
          for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
              crc = (crc << 1) ^ 0x1021;
            } else {
              crc <<= 1;
            }
          }
        }
        return ((crc ^ 0x0000) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
      }

      function gerarCodigoPix() {
        const codigoPix = "11947778799"; // sua chave Pix
      
        // Mostrar código Pix
        document.getElementById("codigoPix").textContent = codigoPix;
        document.getElementById("areaPix").style.display = "block";
      
        // Esconder botão Gerar Pix
        document.getElementById("btnPix").style.display = "none";
      
        // Mostrar botão Enviar pedido WhatsApp
        document.getElementById("btnWhatsApp").style.display = "inline-block";
      }

      function toggleCarrinho() {
  const painel = document.getElementById("painelCarrinho");
  painel.classList.toggle("fechado");
}

function toggleCarrinho() {
  const painel = document.getElementById("painelCarrinho");
  if(painel.classList.contains("aberto")) {
    painel.classList.remove("aberto");
    painel.classList.add("fechado");
  } else {
    painel.classList.remove("fechado");
    painel.classList.add("aberto");
  }
}

      
      
      
     
   
  
   

}