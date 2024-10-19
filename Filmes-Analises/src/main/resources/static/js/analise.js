$(document).ready(function() {

    function onLoad() {
        $('#cadastrarAnalise').click(function() {
            const myModal = new bootstrap.Modal('#modalCadastrarAnalise', { }); 
            myModal.show();
        });

        $('#alterarAnalise').click(function() {
            const myModal = new bootstrap.Modal('#modalAlterarAnalise', { }); 
            myModal.show();

            buscarAnalise();
        });

        $('#excluirAnalise').click(function() {
            const myModal = new bootstrap.Modal('#modalExcluirAnalise', { }); 
            myModal.show();
        });

        $('#formCadastrarAnalise').submit(function (event) { 
            event.preventDefault(); 
            if (validaCampos()) { 
                let analise = { 
                    filme: {
                        id: $('#selectFilme').val(),
                        titulo: null, 
                        genero: null,
                        anoLancamento: null,
                        sinopse: null,
                    }, 
                    analise: $('#analise').val(),
                    nota: parseInt($('#nota').val())
                }; 
                cadastrarAnalise(analise);
                $('#modalCadastrarAnalise').modal('hide');
            }
        });

        $('#formAlterarAnalise').submit(function (event) { 
            event.preventDefault(); 
            if (validaCampos(true)) { 
                let analise = { 
                    filme: {
                        id: $('#selectFilmeAlterar').val(),
                        titulo: null, 
                        genero: null,
                        anoLancamento: null,
                        sinopse: null,
                    }, 
                    analise: $('#analiseAlterar').val(),
                    nota: parseInt($('#notaAlterar').val())
                };
                alterarAnalise(parseInt($('#selectAnaliseAlterar').val()), analise);
                $('#modalAlterarAnalise').modal('hide');
            }
        });

        $('#formExcluirAnalise').submit(function (event) { 
            event.preventDefault(); 
            deletarAnalise(parseInt($('#selectAnaliseExcluir').val()));
            $('#modalExcluirAnalise').modal('hide');
        });

        $('#selectAnaliseAlterar').change(buscarAnalise);
        
        carregarAnalises();
        limpaCampos();
    }

    function carregarAnalises() { 
        $.ajax({ 
            url: 'http://localhost:8080/analises/listar', 
            method: 'GET', 
            success: function (data) { 
                $('#tabelaAnalise tbody').empty();
                $('#selectAnaliseAlterar').html('');
                $('#selectAnaliseExcluir').html('');
                data.forEach(analise => {
                    $('#tabelaAnalise tbody').append(
                        '<tr>' +
                        '<td>' + analise.id + '</td>' +
                        '<td>' + analise.filme.titulo + '</td>' +
                        '<td>' + analise.nota + '</td>' +
                        '<td>' + analise.analise + '</td>' +
                        '</tr>'
                    );
                    carregarSelectAnalise(analise.id, analise.analise);
                });
                carregarSelectFilmes();
            }, 
            error: function () { 
                alert('Não foi possível carregar as análises da API.'); 
            } 
        }); 
    }

    function cadastrarAnalise(analise) { 
        $.ajax({ 
            url: 'http://localhost:8080/analises/adicionar', 
            method: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify(analise), 
            success: function (data) { 
                limpaCampos();
                carregarAnalises(); 
            }, 
            error: function () { 
                alert('Não foi possível cadastrar a análise na API.'); 
            } 
        }); 
    }

    function alterarAnalise(id, analise) { 
        $.ajax({ 
            url: 'http://localhost:8080/analises/atualizar/' + id, 
            method: 'PUT', 
            contentType: 'application/json', 
            data: JSON.stringify(analise), 
            success: function (data) { 
                alert('Análise alterada na API com sucesso!'); 
                limpaCampos();
                carregarAnalises(); 
            }, 
            error: function () { 
                alert('Não foi possível alterar a análise na API.'); 
            } 
        }); 
    } 

    function buscarAnalise() {
        $.ajax({ 
            url: 'http://localhost:8080/analises/pesquisar/' + parseInt($('#selectAnaliseAlterar').val()),
            method: 'GET',
            async: false,
            success: function (analise) {
                $('#filmeAlterar').html('');
                $('#filmeAlterar').append(
                    '<option value="' + analise.filme.id + '">' + analise.filme.titulo + '</option>'
                ); 
                $('#notaAlterar').val(analise.nota);
                $('#analiseAlterar').val(analise.analise);
            }, 
            error: function () { 
                alert('Não foi possível carregar a análise da API.'); 
            } 
        });
    }

    function carregarSelectAnalise(id, analise) { 
        $('#selectAnaliseAlterar').append(
            '<option value="' + id + '">' + analise + '</option>'
        );
        $('#selectAnaliseExcluir').append(
            '<option value="' + id + '">' + analise + '</option>'
        ); 
    }

    function deletarAnalise(id) { 
        $.ajax({ 
            url: 'http://localhost:8080/analises/deletar/' + id, 
            method: 'DELETE', 
            success: function (data) { 
                alert('Análise excluida na API com sucesso!'); 
                carregarAnalises();

            }, 
            error: function () { 
                alert('Não foi possível deletar a análise na API.'); 
            } 
        }); 
    }

    function carregarSelectFilmes() { 
        $.ajax({ 
            url: 'http://localhost:8080/filmes/listar', 
            method: 'GET', 
            success: function (data) { 
                $('#selectFilme').html(''); 
                $('#selectFilmeAlterar').html(''); 
                data.forEach(filme => {
                    $('#selectFilme').append(
                        '<option value="' + filme.id + '">' + filme.titulo + '</option>'
                    );
                    $('#selectFilmeAlterar').append(
                        '<option value="' + filme.id + '">' + filme.titulo + '</option>'
                    );
                });
            }, 
            error: function () { 
                alert('Não foi possível carregar os filmes da API para o select.'); 
            } 
        });

        
    }

    function validaCampos(isAlteracao = false) {
        let bRetorno = false;

        if (isAlteracao) {
            switch (true) {
                case $('#notaAlterar').val() == '':
                    alert('Por favor, preencha o campo Nota.');
                    break;
                case $('#analiseAlterar').val() == '':
                    alert('Por favor, preencha o campo Análise.');
                    break;
                default:
                    bRetorno = true;
                    break;
            }
        } else {
            switch (true) {
                case $('#nota').val() == '':
                    alert('Por favor, preencha o campo Nota.');
                    break;
                case $('#analise').val() == '':
                    alert('Por favor, preencha o campo Análise.');
                    break;
                default:
                    bRetorno = true;
                    break;
            }
        }

        return bRetorno;
    }

    function limpaCampos() {
        $('input').val('');
        $('textarea').val('');
    }

    onLoad();
});