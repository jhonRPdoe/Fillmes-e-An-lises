$(document).ready(function() {

    function onLoad() {
        $('#cadastrarFilme').click(function() {
            const myModal = new bootstrap.Modal('#modalCadastrarFilme', { }); 
            myModal.show();
        });

        $('#alterarFilme').click(function() {
            const myModal = new bootstrap.Modal('#modalAlterarFilme', { }); 
            myModal.show();

            buscarFilme();
        });

        $('#excluirFilme').click(function() {
            const myModal = new bootstrap.Modal('#modalExcluirFilme', { }); 
            myModal.show();
        });

        $('#formCadastrarFilme').submit(function (event) { 
            event.preventDefault(); 
            if (validaCampos()) { 
                let filme = { 
                    titulo: $('#tituloFilme').val(), 
                    genero: $('#genero').val(),
                    anoLancamento: parseInt($('#ano').val()),
                    sinopse: $('#sinopse').val(),
                }; 
                cadastrarFilme(filme);
                $('#modalCadastrarFilme').modal('hide');
            }
        });

        $('#formAlterarFilme').submit(function (event) { 
            event.preventDefault(); 
            if (validaCampos(true)) { 
                let filme = { 
                    titulo: $('#tituloFilmeAlterar').val(), 
                    genero: $('#generoAlterar').val(),
                    anoLancamento: parseInt($('#anoAlterar').val()),
                    sinopse: $('#sinopseAlterar').val(),
                }; 
                alterarFilme(parseInt($('#selectFilmeAlterar').val()), filme);
                $('#modalAlterarFilme').modal('hide');
            }
        });

        $('#formExcluirFilme').submit(function (event) { 
            event.preventDefault(); 
            deletarFilme(parseInt($('#selectFilmeExcluir').val()));
            $('#modalExcluirFilme').modal('hide');
        });

        $('#selectFilmeAlterar').change(buscarFilme);

        carregarFilmes();
        limpaCampos();
        aplicaDarkMode();
    }

    function carregarFilmes() { 
        $.ajax({ 
        url: 'http://localhost:8080/filmes/listar', 
        method: 'GET', 
        success: function (data) { 
            $('#tabelaFilme tbody').empty(); 
            data.forEach(filme => {
                $('#tabelaFilme tbody').append(
                    '<tr>' +
                    '<td>' + filme.id + '</td>' +
                    '<td>' + filme.titulo + '</td>' +
                    '<td>' + filme.genero + '</td>' +
                    '<td>' + filme.anoLancamento + '</td>' +
                    '<td>' + filme.sinopse + '</td>' +
                    '</tr>'
                ); 
            });
            carregarSelectFilmesAlterar();
            carregarSelectFilmesExcluir();
        }, 
        error: function () { 
            alert('Não foi possível carregar os filmes da API.'); 
        } 
        }); 
    }

    function cadastrarFilme(filme) { 
        $.ajax({ 
            url: 'http://localhost:8080/filmes/adicionar', 
            method: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify(filme), 
            success: function (data) { 
                limpaCampos();
                carregarFilmes(); 
            }, 
            error: function () { 
                alert('Não foi possível cadastrar o filme na API.'); 
            } 
        }); 
    }

    function alterarFilme(id, filme) { 
        $.ajax({ 
            url: 'http://localhost:8080/filmes/atualizar/' + id, 
            method: 'PUT', 
            contentType: 'application/json', 
            data: JSON.stringify(filme), 
            success: function (data) { 
                alert('Filme alterado na API com sucesso!'); 
                limpaCampos();
                carregarFilmes(); 
            }, 
            error: function () { 
                alert('Não foi possível alterar o filme na API.'); 
            } 
        }); 
    } 

    function buscarFilme() {
        $.ajax({ 
            url: 'http://localhost:8080/filmes/pesquisar/' + parseInt($('#selectFilmeAlterar').val()),
            method: 'GET',
            async: false,
            success: function (filme) { 
                $('#tituloFilmeAlterar').val(filme.titulo);
                $('#generoAlterar').val(filme.genero);
                $('#anoAlterar').val(filme.anoLancamento);
                $('#sinopseAlterar').val(filme.sinopse);
            }, 
            error: function () { 
                alert('Não foi possível carregar o filme da API.'); 
            } 
        });
    }

    function carregarSelectFilmesAlterar() { 
        $.ajax({ 
        url: 'http://localhost:8080/filmes/listar', 
        method: 'GET', 
        success: function (data) { 
            $('#selectFilmeAlterar').html(''); 
            data.forEach(filme => {
                $('#selectFilmeAlterar').append(
                    '<option value="' + filme.id + '">' + filme.titulo + '</td>' + '</option>'
                ); 
            });
        }, 
        error: function () { 
            alert('Não foi possível carregar os filmes da API para o select.'); 
        } 
        });
    }

    function carregarSelectFilmesExcluir() { 
        $.ajax({ 
        url: 'http://localhost:8080/filmes/listar', 
        method: 'GET', 
        success: function (data) { 
            $('#selectFilmeExcluir').html(''); 
            data.forEach(filme => {
                $('#selectFilmeExcluir').append(
                    '<option value="' + filme.id + '">' + filme.titulo + '</td>' + '</option>'
                ); 
            });
        }, 
        error: function () { 
            alert('Não foi possível carregar os filmes da API para o select.'); 
        } 
        });
    }

    function deletarFilme(id) {
        if (deletarAnalisesByFilme(id)) {
            $.ajax({ 
                url: 'http://localhost:8080/filmes/deletar/' + id, 
                method: 'DELETE', 
                success: function (data) { 
                    alert('Filme excluido na API com sucesso!'); 
                    carregarFilmes();

                }, 
                error: function () { 
                    alert('Não foi possível deletar o filme na API.'); 
                } 
            });
        } 
    } 

    function deletarAnalisesByFilme(id) {
        let bRetorno = false;
        $.ajax({ 
            url: 'http://localhost:8080/analises/pesquisar-idFilme/' + id, 
            method: 'GET',
            async: false, 
            success: function (data) { 
                data.forEach(analise => {
                    deletarAnalise(analise.id);
                });
                alert('Análises excluidas na API com sucesso!');
                bRetorno = true; 
            }, 
            error: function () { 
                alert('Não foi possível deletar as análises da API.'); 
            } 
        });
        return bRetorno;
    }

    function deletarAnalise(id) {
        $.ajax({ 
            url: 'http://localhost:8080/analises/deletar/' + id, 
            method: 'DELETE', 
            success: function (data) {}, 
            error: function () { 
                alert('Não foi possível deletar a análise na API.'); 
            } 
        }); 
    }

    function validaCampos(isAlteracao = false) {
        let bRetorno = false;
        if (isAlteracao) {
            switch (true) {
                case $('#tituloFilmeAlterar').val() == '':
                    alert('Por favor, preencha o campo Título.');
                    break;
                case $('#generoAlterar').val() == '':
                    alert('Por favor, preencha o campo Genero.');
                    break;
                case $('#anoAlterar').val() == '':
                    alert('Por favor, preencha o campo Ano de Lançamento.');
                    break;
                case $('#sinopseAlterar').val() == '':
                    alert('Por favor, preencha o campo Sinopse.');
                    break;
                default:
                    bRetorno = true;
                    break;
            }
        } else {
            switch (true) {
                case $('#tituloFilme').val() == '':
                    alert('Por favor, preencha o campo Título.');
                    break;
                case $('#genero').val() == '':
                    alert('Por favor, preencha o campo Genero.');
                    break;
                case $('#ano').val() == '':
                    alert('Por favor, preencha o campo Ano de Lançamento.');
                    break;
                case $('#sinopse').val() == '':
                    alert('Por favor, preencha o campo Sinopse.');
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