import React from "react";
import { IndexContext } from "../../context/index";
import FilledInput from "@mui/material/FilledInput";
import Button from "@mui/material/Button";

function Popup(props) {
  const { setStatus, status, enviaForm, setDadosForm, dadosForm } =
    React.useContext(IndexContext);

  async function enviaFormularioEditar(e) {
    e.preventDefault();
    enviaForm();
  }

  //   var idCdaAbastecimento = props?.msg?.id_cda_padrao_abastec
  //   var idCda = parseInt(props?.msg?.id_cda)
  //   var idModelo = props?.msg?.id_modelo_veiculo

  // var idCdaAbastecimento = props?.msg?.id_cda_padrao_abastec
  // var idCda = parseInt(props?.msg?.id_cda)
  // var idModelo = props?.msg?.id_modelo_veiculo

  return props.trigger ? (
    <div className="teste popup">
      <div className="popu-iner">
        <div className="popup-header">
          <button
            className="botaoX"
            onClick={() => {
              props.setTriger(false);
              setStatus(null);
            }}
          >
            X
          </button>
        </div>
        <h1 className="text-center">{dadosForm.cdaDescricao}</h1>
        <h1 className="text-center">{dadosForm.veiculoDescricao}</h1>
        <form className="form-center" onSubmit={enviaFormularioEditar}>
          <div className="inputs">
            <div className="litros">
              <h3 className="text-center">Qtd. de Litros</h3>
              <FilledInput
                type="number"
                value={dadosForm.qtdLitros}
                inputProps={{ min: 0, max: 9999 }}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    var qtdLitros = parseInt(e.target.value);
                    setDadosForm({ ...dadosForm, qtdLitros });
                  }
                }}
              />
            </div>
            <div className="media">
              <h3 className="text-center">Média Padrão</h3>
              <FilledInput
                type="number"
                value={dadosForm.mediaAbastecimento}
                inputProps={{ min: 0.0, max: 99.99, step: 0.01 }}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    var mediaAbastecimento = parseFloat(e.target.value);
                    setDadosForm({ ...dadosForm, mediaAbastecimento });
                  }
                }}
              />
            </div>
          </div>
          <div className="botoes">
            <Button
              type="submit"
              variant="contained"
              color="success"
              className=""
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
