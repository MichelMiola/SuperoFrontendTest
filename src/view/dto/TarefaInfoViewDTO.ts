export class TarefaInfoViewDTO {
    public idTarefa?: number;
    public titulo?: string;
    public descricao?: string;
    public statusConcluido: boolean = false;
    public dataCriacao?: string;
    public dataEdicao?: string;
}