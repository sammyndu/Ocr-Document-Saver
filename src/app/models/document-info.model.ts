export class DocumentInfo {
    id!: number;
    documentId: string = '';
    documentName: string = '';
    documentContent: string = '';
    case: string = "";
}

export class DocumentInfoEntity {
    id!: number;
    documentId: string = '';
    documentName: string = '';
    documentContent: string = '';
    dateSubmitted!: Date;
    dateModified!: Date;
    case: string = "";
}