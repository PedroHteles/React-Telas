import React from "react";
import { IndexContext } from "../../context/index";
import FilledInput from "@mui/material/FilledInput";
import Button from "@mui/material/Button";

function Popup(props) {
  const { setStatus, enviaForm, setDadosForm, dadosForm } = React.useContext(IndexContext);

  async function enviaFormularioEditar(e) {
    e.preventDefault();
    enviaForm();
  }

  return props.trigger ? (
    <div className="teste popup">
      <div className="popu-iner">
        <div className="popup-header">
          <button className="botaoX" onClick={() => {props.setTriger(false);setStatus(null);}}>X</button>
        </div>
        <h1 className="text-center">{dadosForm.nomeCda}</h1>
        <h1 className="text-center">{dadosForm.nomeModeloVeiculo}</h1>
        <form className="form-center" onSubmit={enviaFormularioEditar}>
          <div className="inputs">
            <div className="litros">
              <h3 className="text-center">Qtd. de Litros</h3>
              <FilledInput
                type="number"
                value={dadosForm.qtdLitrosAbastecPadrao ? dadosForm.qtdLitrosAbastecPadrao : ""}
                inputProps={{min:0,max:9999}}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    var qtdLitrosAbastecPadrao = parseInt(e.target.value);
                    setDadosForm({...dadosForm,qtdLitrosAbastecPadrao});
                  }}}/>
            </div>
            <div className="media">
              <h3 className="text-center">Média Padrão</h3>
              <FilledInput
                type="number"
                value={dadosForm.mediaPadrao ? dadosForm.mediaPadrao : ""}
                inputProps={{min:0.0,max:99.99,step:0.01}}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    var mediaPadrao = parseFloat(e.target.value);
                    setDadosForm({...dadosForm, mediaPadrao});
                  }}}/>
            </div>
          </div>
          <div className="botoes">
            <Button type="submit" variant="contained" color="success" className="">Enviar</Button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
