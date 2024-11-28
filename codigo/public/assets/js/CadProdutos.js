function init() {
    // Define uma variável para o formulário de produto
    formProduto = document.getElementById("formProduto");

    // Adiciona funções para tratar os eventos 
    btnInsert = document.getElementById("btnInsert");
    btnInsert.addEventListener('click', function () {
        // Verifica se o formulário está preenchido corretamente
        if (!formContato.checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoID = document.getElementById('cad_pd_id').value;
        let campoNome = document.getElementById('cad_pd_nome').value;
        let campoIMG = document.getElementById('cad_pd_image').value;
        let campoMoeda = document.getElementById('cad_pd_moeda').value;
        let campoPrice = document.getElementById('cad_pd_price').value;
        let campoDescription = document.getElementById('cad_pd_description').value;


        // Cria um objeto com os dados do produto
        let produto = {
            id: campoID,
            name: campoNome,
            image: campoIMG,
            descripition: campoDescription,
            price: [
                currency: campoMoeda,
                amount: campoPrice
            ]
        };

        // Cria o produto no banco de dados
        createProduto(produto, exibeProdutos);

        // Limpa o formulario
        formContato.reset()
    });
    /*
        // Trata o click do botão Alterar
        btnUpdate = document.getElementById("btnUpdate");
        btnUpdate.addEventListener ('click', function () {
            // Obtem os valores dos campos do formulário
            let campoId = document.getElementById("inputId").value;
            if (campoId == "") {
                displayMessage("Selecione antes um contato para ser alterado.");
                return;
            }
    
            // Obtem os valores dos campos do formulário
            let campoNome = document.getElementById('inputNome').value;
            let campoTelefone = document.getElementById('inputTelefone').value;
            let campoEmail = document.getElementById('inputEmail').value;
            let campoCidade = document.getElementById('inputCidade').value;
            let campoCategoria = document.getElementById('inputCategoria').value;
            let campoSite = document.getElementById('inputSite').value;
    
            // Cria um objeto com os dados do contato
            let contato = { nome: campoNome, 
                telefone: campoTelefone, 
                email: campoEmail, 
                cidade: campoCidade, 
                categoria: campoCategoria,
                website: campoSite };
    
            // Altera o contato no banco de dados
            updateContato(parseInt(campoId), contato, exibeContatos);
    
            // Limpa o formulario
            formContato.reset()
        });
    
        // Trata o click do botão Excluir
        btnDelete = document.getElementById('btnDelete');
        btnDelete.addEventListener ('click', function () {
            let campoId = document.getElementById('inputId').value;
            if (campoId == "") {
                displayMessage("Selecione um contato a ser excluído.");
                return;
            }
    
            // Exclui o contato no banco de dados
            deleteContato(parseInt(campoId), exibeContatos);
    
            // Limpa o formulario
            formContato.reset()
        });
    
        // Trata o click do botão Listar Contatos
        btnClear = document.getElementById('btnClear');
        btnClear.addEventListener ('click', function () {                
            formContato.reset()
        });
    
        // Oculta a mensagem de aviso após alguns 5 segundos
        msg = document.getElementById('msg');
        msg.addEventListener ("DOMSubtreeModified", function (e) {
            if (e.target.innerHTML == "") return;
            setTimeout (function () {
                alert = msg.getElementsByClassName("alert");
                alert[0].remove();
            }, 5000);
        })
    
        // Preenche o formulário quando o usuario clicar em uma linha da tabela 
        gridContatos = document.getElementById("grid-contatos");
        gridContatos.addEventListener('click', function (e) {
            if (e.target.tagName == "TD") { 
    
                // Obtem as colunas da linha selecionada na tabela
                let linhaContato = e.target.parentNode;
                colunas = linhaContato.querySelectorAll("td");
    
                // Preenche os campos do formulário com os dados da linha selecionada na tabela
                document.getElementById ('inputId').value = colunas[0].innerText;
                document.getElementById ('inputNome').value = colunas[1].innerText;
                document.getElementById ('inputTelefone').value = colunas[2].innerText;
                document.getElementById ('inputEmail').value = colunas[3].innerText;
                document.getElementById ('inputCidade').value = colunas[4].innerText;
                document.getElementById ('inputCategoria').value = colunas[5].innerText;
                document.getElementById ('inputSite').value = colunas[6].innerText;
            }
        });
    
        exibeContatos();
    }*/
}
    const apiUrl = '/produtos';

    function readProduto(processaDados) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                processaDados(data);
            })
            .catch(error => {
                console.error('Erro ao ler produtos via API JSONServer:', error);
                console.log("Erro ao exibir produtos")
            });
    }

    function createProduto(produto, refreshFunction) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Produto inserido com sucesso");
                if (refreshFunction)
                    refreshFunction();
            })
            .catch(error => {
                console.error('Erro ao inserir produto via API JSONServer:', error);
                console.log("Erro ao inserir produto");
            });
    }

    function updateProduto(id, produto, refreshFunction) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Produto alterado com sucesso");
                if (refreshFunction)
                    refreshFunction();
            })
            .catch(error => {
                console.error('Erro ao atualizar produto via API JSONServer:', error);
                console.log("Erro ao atualizar produto");
            });
    }

    function deleteProduto(id, refreshFunction) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log("Produto removido com sucesso");
                if (refreshFunction)
                    refreshFunction();
            })
            .catch(error => {
                console.error('Erro ao remover produto via API JSONServer:', error);
                console.log("Erro ao remover produto");
            });
    };