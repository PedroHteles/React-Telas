from re import escape
import re
from api import app,engine
from api.admin.models import modelo_veiculos,cdas,cda_padrao_abastecimentos
from api.admin.pesquisa import pesquisa_banco
from flask import Flask,request,jsonify 
import simplejson as json
from sqlalchemy.sql import select
# @app.route('/medias', methods=['GET'])
# def Medias():
#     s = select(cda_padrao_abastecimentos.c.media_padrao)
#     conn = engine.connect()
#     result = conn.execute(s)
#     data = [tuple(map(str, tup)) for tup in result.all()]
#     print(data)
#     return json.dumps(result.all())

@app.route('/cdas', methods=['GET'])
def Cdas():
    s = cdas.select()
    conn = engine.connect()
    result = conn.execute(s)
    return json.dumps(result.all()),200


@app.route('/modelos', methods=['GET'])
def modelos():
    s = modelo_veiculos.select()
    conn = engine.connect()
    result = conn.execute(s)
    return json.dumps(result.all()),200

@app.route('/pesquisa', methods=['POST'])
def pesquisa():
    request_data = json.loads(request.data)
    id_cda = request_data['indexcda']
    veiculos = request_data['indexveiculos']
    id_cda0 = request_data['cda0']
    conn = engine.connect()
    return json.dumps(pesquisa_banco(id_cda,veiculos,id_cda0,conn)),200

@app.route('/editar', methods=['POST'])
def editar():
    request_data = json.loads(request.data)
    media = request_data['media']
    litros = request_data['litros']
    id_cda = request_data['id_cda']
    id_modelo = request_data['id_modelo']
    cdapadrao = request_data['id_CdaPadrao']
    id_cda = request_data['indexcda']
    veiculos = request_data['indexveiculos']
    id_cda0 = request_data['cda0']
    conn = engine.connect()

    if (type(media) == float or type(media) == int) and type(litros) == int and type(id_cda) == int and type(id_modelo) == int and type(cdapadrao) == int and type(id_cda) == int and type(veiculos) == int and type(id_cda0) == int:
        s = select(cda_padrao_abastecimentos).where(cda_padrao_abastecimentos.c.id_cda_padrao_abastec == cdapadrao)
        result = conn.execute(s)
        if media < 100 and result.one() != []:
            try:
                tmt = cda_padrao_abastecimentos.update().where(cda_padrao_abastecimentos.c.id_cda_padrao_abastec == cdapadrao).values(qtd_litros_abastec_padrao=litros,media_padrao=media)
                conn.execute(tmt)
                results = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec, cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo where cpa1.id_cda_padrao_abastec = {cdapadrao}''').one()
                return json.dumps({'alterado': pesquisa_banco(id_cda,veiculos,id_cda0,conn),'valor_alterado':results}),201
            except:
                return jsonify({'status': 'erro ao inserir objeto'}),400
        else:
            return jsonify({'status': 'media nao pode ser maior que 99,99 '}),400
    else:
        return jsonify({'status': 'inserir apenas numeros'}),403


@app.route('/criar', methods=['POST'])
def criar():
    request_data = json.loads(request.data)
    media = request_data['media']
    litros = request_data['litros']
    id_cda = request_data['id_cda']
    id_modelo = request_data['id_modelo']
    cdapadrao = request_data['id_CdaPadrao']
    id_cdaPesquisa = request_data['indexcda']
    veiculos = request_data['indexveiculos']
    id_cda0 = request_data['cda0']
    conn = engine.connect()

    if (type(media) == float or type(media) == int) and type(litros) == int and type(id_cda) == int and type(id_modelo) == int and cdapadrao == None and type(id_cda) == int and type(veiculos) == int and type(id_cda0) == int:
        s = select(cda_padrao_abastecimentos.c.id_cda, cda_padrao_abastecimentos.c.id_modelo_veiculo).where(cda_padrao_abastecimentos.c.id_cda == id_cda,cda_padrao_abastecimentos.c.id_modelo_veiculo == id_modelo)
        result = conn.execute(s)
        if result.all() == []:
            try: 
                ins = cda_padrao_abastecimentos.insert().values(id_cda=id_cda,id_modelo_veiculo=id_modelo,qtd_litros_abastec_padrao=litros,media_padrao=media)
                conn.execute(ins)
                s = select(cda_padrao_abastecimentos.c.id_cda_padrao_abastec).where(cda_padrao_abastecimentos.c.id_cda == id_cda,cda_padrao_abastecimentos.c.id_modelo_veiculo == id_modelo)
                result = conn.execute(s)
                results = conn.execute(f'''SELECT cpa1.id_cda_padrao_abastec, cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo where cpa1.id_cda_padrao_abastec = {result.one().id_cda_padrao_abastec}''').one()
                if results != []:
                    return json.dumps({'criado': pesquisa_banco(id_cdaPesquisa,veiculos,id_cda0,conn),'valor_alterado':results}),201
                else:
                   return jsonify({'status': 'ao inserir / retornar obj'}),400  
            except:
                return jsonify({'status': 'erro'}),400
        else:
            return jsonify({'status': 'item ja inserido'}),400
    else:
        return jsonify({'status': 'erro'}),403









    
if __name__ == '__main__':
    app.run(debug=True)