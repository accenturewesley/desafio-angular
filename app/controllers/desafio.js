app.controller('DesafioCtrl', ['$scope', '$filter', 'orderByFilter', function($scope, $filter, orderByFilter) { 

    $scope.filtro = '';
    $scope.order = '';

    $.ajax({
        dataType: "json",
        url: './app/data/pessoas.json',
        success: function(retorno){
            $scope.$apply(function(){ 
                //Formata a data para o estilo dd/MM/yyyy para todos elementos da array com o map
                $scope.pessoas = retorno.pessoas.map(function(x){
                    x.dtNascimento = new Date(x.dtNascimento);
                    x.dtFormatada = $filter('date')(x.dtNascimento, 'dd/MM/yyyy');
                    return x;
                });
            });
        }
    });

//Comportamento dos botões de filtro
    $scope.selecionarBotao = function(filtro){
        $scope.botaoSelecionado = filtro;
        switch(filtro)
        {
            case 'nome':
                $scope.pessoas = orderByFilter($scope.pessoas, 'nome', false);
                $scope.filtro = '';
                break;
            case 'nascimento':
                $scope.pessoas = orderByFilter($scope.pessoas, 'dtNascimento', false);
                $scope.filtro = '';
                break;
            case 'homem':
                $scope.filtro = "masculino"
                break;
            case 'mulher':
                $scope.filtro = "feminino"
                break;
        }
    };
    //Checa o filtro e com o retorno, e entãoo checa se o sexo corresponde ao filtro
    $scope.obterFiltro = function(pessoa){
        if($scope.filtro == 'masculino')
            return pessoa.sexo == 'masculino';

        if($scope.filtro == 'feminino')
            return pessoa.sexo == 'feminino';

        return true;
    };

    //Mudar a cor do botão no clique
    $scope.corBotao = function(botao){
        if(botao == $scope.botaoSelecionado)
            return 'botao-filtro-selecionado';
        
        return 'botao-filtro';
    };

    //Validação do botão
    $scope.salvar = function(){
        if(!$scope.novaPessoa.nome)
            return alert('Por favor, preencha o nome corretamente.');

        if(!$scope.novaPessoa.dtNascimento)
            return alert('Por favor, preencha a data de nascimento corretamente.');

        if(!$scope.novaPessoa.sexo)
            return alert('Por favor, selecione o sexo.');

        //O input de date nao tava retornando um objeto date então tive que formatar a 
        //dtNascimento pra ser um objeto date
        $scope.novaPessoa.dtNascimento = new Date($scope.novaPessoa.dtNascimento.replace(new RegExp('-', "g"), '/'));
        $scope.novaPessoa.dtFormatada = $filter('date')($scope.novaPessoa.dtNascimento, 'dd/MM/yyyy');
        
        //Coloca o cadastro na array da tabela
        $scope.pessoas.push($scope.novaPessoa);
        $scope.novaPessoa = undefined;

    }
    //O ng-if no formulario pra adicionar um botão só aparece se a pessoa não for undefined;
    //No cancelar já é definida como undefined pra sumir aquele formulario e limpar o que foi digitado
    $scope.adicionar = function(){
        $scope.novaPessoa = {};
    };
    
    $scope.cancelar = function(){
        $scope.novaPessoa = undefined;
    }

}]);