import React, {} from 'react';
import {RouteComponentProps} from "react-router";
import {TarefaInfoViewDTO} from "./dto/TarefaInfoViewDTO";
import {Fetch} from "../core/http/Fetch";
import {UrlApplication} from "../core/constants/urlApplication";
import {Routes} from "../core/constants/routes";

interface TarefaInfoViewProps extends RouteComponentProps {

}

interface TarefaInfoViewState {
    tarefa: TarefaInfoViewDTO
}

export class TarefaInfoView extends React.Component<TarefaInfoViewProps, TarefaInfoViewState> {

    constructor(props: TarefaInfoViewProps) {
        super(props);

        this.state = {
            tarefa: new TarefaInfoViewDTO(),
        };

        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.onChangeStatusTarefa = this.onChangeStatusTarefa.bind(this);
    }

    private onChangeTitulo(event: any) {
        const tarefa = Object.assign({}, this.state.tarefa);
        tarefa.titulo = event.target.value;
        this.setState({tarefa});
    }

    private onChangeDescricao(event: any) {
        const tarefa = Object.assign({}, this.state.tarefa);
        tarefa.descricao = event.target.value;
        this.setState({tarefa});
    }

    private onChangeStatusTarefa(event: any) {
        const tarefa = Object.assign({}, this.state.tarefa);
        tarefa.statusConcluido = event.target.value === "true";
        this.setState({tarefa});
    }

    private async handleSave() {
        const url = UrlApplication.HOST + UrlApplication.PATH_TAREFAS;
        Fetch.doPost(url, this.state.tarefa)
            .then(() => {
                this.props.history.push(Routes.TAREFA_LIST);
            });

    }

    private async handleEdit() {
        const url = UrlApplication.HOST + UrlApplication.PATH_TAREFAS + this.state.tarefa.idTarefa;
        let tarefaClone = Object.assign({}, this.state.tarefa);
        tarefaClone.dataCriacao = undefined;
        tarefaClone.dataEdicao = undefined;
        Fetch.doPut(url, tarefaClone)
            .then(() => {
                console.log("PUT OK");
                this.props.history.push(Routes.TAREFA_LIST);
            })
            .catch(() => {
                console.log("PUT ERRO");
            });
    }

    async componentDidMount() {
        const {idSession}: any = this.props.match.params;
        console.log(idSession);
        const tarefaSessionStorage = sessionStorage.getItem(idSession) as string;
        const tarefa = JSON.parse(tarefaSessionStorage);
        this.setState({tarefa});
    }

    render() {
        console.log("this.state: ", this.state);
        return (
            <div>
                {this.state.tarefa.idTarefa ? (<h1>Edição</h1>) : (<h1>Cadastro</h1>)}

                <form>
                    <label>
                        Titulo:
                        <input type="text" value={this.state.tarefa.titulo} onChange={this.onChangeTitulo}
                               name="titulo"/>
                    </label>

                    <br/>
                    <label>
                        Status tarefa:
                        <input type="radio" value={"false"} checked={!this.state.tarefa.statusConcluido}
                               onChange={this.onChangeStatusTarefa} name="nao_concluida"/>Não concluida
                        <input type="radio" value={"true"} checked={this.state.tarefa.statusConcluido as boolean}
                               onChange={this.onChangeStatusTarefa} name="concluida"/>Concluida
                    </label>

                    <br/>
                    <label>
                        Descrição:
                        <input type="textArea" value={this.state.tarefa.descricao} onChange={this.onChangeDescricao}/>
                    </label>

                    <p>
                        {
                            this.state.tarefa.idTarefa ? (
                                <input type="submit"
                                       value={"Editar"}
                                       onClick={() => this.handleEdit()}/>
                            ) : (
                                <input type="submit"
                                       value={"Salvar"}
                                       onClick={() => this.handleSave()}/>
                            )
                        }

                    </p>
                </form>
            </div>
        );
    }

}