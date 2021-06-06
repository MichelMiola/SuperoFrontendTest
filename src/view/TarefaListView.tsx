import React, {} from 'react';
import {RouteComponentProps} from "react-router";
import {Fetch} from "../core/http/Fetch";
import {UrlApplication} from "../core/constants/urlApplication";
import {TarefaListViewDTO} from "./dto/TarefaListViewDTO";
import {v4} from "uuid";
import {Routes} from "../core/constants/routes";

interface TarefaListViewProps extends RouteComponentProps {

}

interface TarefaListViewState {
   tarefas: TarefaListViewDTO[]
}

export class TarefaListView extends React.Component<TarefaListViewProps, TarefaListViewState> {

    constructor(props: TarefaListViewProps) {
        super(props);

        this.state = {
            tarefas: []
        }
    }

    private async getTarefas(): Promise<any> {
        const url = UrlApplication.HOST + UrlApplication.PATH_TAREFAS
        return Fetch.doGet(url);
    }

    private async deleteAndRefresh(idTarefa: number) {
        const url = UrlApplication.HOST + UrlApplication.PATH_TAREFAS + idTarefa;
        await Fetch.doDelete(url);
        const tarefas = await this.getTarefas();
        this.setState((prev) => {
            return {
                tarefas: tarefas
            }
        });
    }

    private async callEditar(idTarefa: number) {
        const url = UrlApplication.HOST + UrlApplication.PATH_TAREFAS + idTarefa;
        const tarefa = await Fetch.doGet(url);
        const idSession = v4();
        sessionStorage.setItem(idSession, JSON.stringify(tarefa));
        this.props.history.push({pathname: Routes.TAREFA_EDIT.replace(":idSession", idSession)});
    }

    async componentDidMount() {
        const tarefas = await this.getTarefas();
        this.setState((prev) => {
            return {
                tarefas: tarefas
            }
        });
    }

    render() {
        console.log("this.state: ", this.state);
        console.log("this.props: ", this.props);
        return (
            <div>
                <h1>Listagem</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Status concluído</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    {this.state.tarefas.map((tarefa) => {
                        return (
                          <tbody key={v4()}>
                              <tr>
                                  <td>{tarefa.titulo}</td>
                                  <td>{tarefa.statusConcluido ? "Concluído" : "Não concluído"}</td>
                                  <td>{tarefa.descricao}</td>
                                  <td>
                                      <button onClick={() => this.deleteAndRefresh(tarefa.idTarefa as number)}>Deletar</button>
                                      <button onClick={() => this.callEditar(tarefa.idTarefa as number)}>Editar</button>
                                  </td>
                              </tr>
                          </tbody>
                        );
                    })}
                </table>
                <p/>
                <button name={"call-cadastrar-tarefa"} onClick={() => this.props.history.push(Routes.TAREFA_ADD)}> Cadastrar tarefa</button>
            </div>
        );
    }
}