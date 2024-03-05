from flask import Flask, jsonify, make_response, request
import psycopg2
import json

app = Flask(__name__)
# instale o postgres antes, e pra rodar os comandos abaixo, execute o cmd como administrador

# Iniciar o bd > pg_ctl -D "F:\PostgreSQL\data" start

# Finalizar o bd > pg_ctl -D "F:\PostgreSQL\data" stop

# Configurações do banco de dados
db_connection = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='admin',
    host='localhost'
)


# retorna todos os protudos
@app.route('/get_produto', methods=['GET'])
def get_produto():
    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute('SELECT * FROM loja.produto')
    results = comando.fetchall()
    comando.close()

    if results:
        for item in results:
            print(item)

        response = make_response(jsonify(results))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Permitir solicitações de qualquer origem
        return response

    else:
        print(json.dumps({'message': 'Dado nao encontrado.'}))
        response = make_response(json.dumps({'message': 'Dado nao encontrado.'}))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Permitir solicitações de qualquer origem
        return response


# busca um produto especifico pelo id
@app.route('/get_produto_id/<id>', methods=['GET'])
def get_protudo_id(id):
    id_new = str(id)

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute('SELECT * FROM loja.produto WHERE idProduto = ' + id_new)
    results = comando.fetchall()
    comando.close()

    if results:
        print(results)

        response = make_response(jsonify(results))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Permitir solicitações de qualquer origem
        return response

    else:
        print(json.dumps({'message': 'Dado nao encontrado.'}))
        response = make_response(json.dumps({'message': 'Dado nao encontrado.'}))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Permitir solicitações de qualquer origem
        return response


# busca produtos pelo nome
@app.route('/busca_produto/<nomeProduto>', methods=['GET'])
def busca_produto(nomeProduto):
    nomeProduto_new = str(nomeProduto)

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute('SELECT * FROM loja.produto WHERE lower(nomeProduto) like lower(%s)', ('%' + nomeProduto_new + '%',))

    results = comando.fetchall()
    comando.close()

    if results:
        print(results)

        response = make_response(jsonify(results))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Permitir solicitações de qualquer origem
        return response

    else:
        print(json.dumps({'message': 'Dado nao encontrado.'}))
        response = make_response(json.dumps({'message': 'Dado nao encontrado.'}))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Permitir solicitações de qualquer origem
        return response


# Rota para criar um novo produto
@app.route('/criar_produto', methods=['POST'])
def create_produto():
    data = request.get_json()

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute("INSERT INTO loja.produto (nomeProduto, estoqueProduto, descricao, preco, desconto, idCategoria, fotoProduto) VALUES (%s,%s,%s,%s,%s,%s,%s)",
                    (data['nomeProduto'], data['estoqueProduto'], data['descricao'], data['preco'],
                     data['desconto'], data['idCategoria'], data['fotoProduto']))

    db_connection.commit()
    comando.close()

    print(json.dumps({'message': 'Produto cadastrado com sucesso!'}))
    return json.dumps({'message': 'Produto cadastrado com sucesso!'})


# Rota para atualizar um produto
@app.route('/atualizar_produto/<id>', methods=['PUT'])
def update_produto(id):
    id_new = str(id)
    data = request.get_json()

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute("UPDATE loja.produto SET nomeProduto=%s, estoqueProduto=%s, descricao=%s, preco=%s, "
                    "desconto=%s, idCategoria=%s, fotoProduto=%s WHERE idProduto = %s",
                    (data['nomeProduto'], data['estoqueProduto'], data['descricao'],
                     data['preco'], data['desconto'], data['idCategoria'], data['fotoProduto'], id_new))

    db_connection.commit()
    comando.close()

    print(json.dumps({'message': 'Produto atualizado com sucesso!'}))
    return json.dumps({'message': 'Produto atualizado com sucesso!'})


# Rota para deletar um produto
@app.route('/deletar_produto', methods=['DELETE'])
def delete_produto():
    data = request.get_json()

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute("DELETE FROM loja.produto WHERE idProduto = %s", (data['idProduto'],))
    db_connection.commit()
    comando.close()

    print(json.dumps({'message': 'Produto deletado com sucesso.'}))
    return json.dumps({'message': 'Produto deletado com sucesso.'})

# Rota para criar uma nova categoria
@app.route('/criar_categoria', methods=['POST'])
def create_categoria():
    data = request.get_json()

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute("INSERT INTO loja.categoria (nome) VALUES (%s)",
                    ( data['nome_categoria']))

    db_connection.commit()
    comando.close()

    print(json.dumps({'message': 'Categoria cadastrada com sucesso!'}))
    return json.dumps({'message': 'Categoria cadastrada com sucesso!'})

# Rota para criar um novo cliente
@app.route('/criar_login_cliente', methods=['POST'])
def create_login_cliente():
    data = request.get_json()

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute("INSERT INTO loja.Cliente (genero, nome, email, senha, cpf, idEndereco, idListaDesejos, "
                    "idCarrinho) VALUES (null, %s, %s, MD5(%s), null, null, null, null)",
                    (data['nome'], data['email'], data['senha']))

    db_connection.commit()
    comando.close()

    print(json.dumps({'message': 'Usuario criado com sucesso!'}))
    return json.dumps({'message': 'Usuario criado com sucesso!'})

# Rota para atualizar dados de cliente
@app.route('/atualizar_dados_cliente/<id>', methods=['PUT'])
def update_dados_cliente(id):
    id_new = str(id)
    data = request.get_json()

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute("UPDATE loja.cliente SET genero=%s, cpf=%s, nome=%s, email=%s, senha=MD5(%s) WHERE idCliente = %s",
                    (data['genero'], data['cpf'], data['nome'],
                     data['email'], data['senha'], id_new))

    db_connection.commit()
    comando.close()

    print(json.dumps({'message': 'Dados do Cliente foram atualizados com sucesso!'}))
    return json.dumps({'message': 'Dados do Cliente foram atualizados com sucesso!'})

# Rota para validar login
@app.route('/validar_login_cliente/', methods=['GET'])
def validar_login_cliente():
    data = request.get_json()

    comando = db_connection.cursor()
    db_connection.rollback()
    comando.execute("SELECT idCliente, nome from loja.cliente WHERE email = %s and senha = MD5(%s)",
                    (data['email'], data['senha']))

    results = comando.fetchall()
    comando.close()

    if results:
        for item in results:
            print(item)

        response = make_response(jsonify(results))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Permitir solicitações de qualquer origem
        return response

    else:
        print(json.dumps({'message': 'Usuario nao encontrado.'}))
        response = make_response(json.dumps({'message': 'Dado nao encontrado.'}))
        response.headers['Access-Control-Allow-Origin'] = '*'  # Permitir solicitações de qualquer origem
        return response

if __name__ == '__main__':
    app.run(port=5000, host="localhost", debug=True)