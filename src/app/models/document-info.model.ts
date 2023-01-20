export class DocumentInfo {
    id!: number;
    documentId: string = '';
    documentName: string = '';
    documentContent: string = '';
    case: string = "";
    createdBy: string = "";
    dateSubmitted!: Date;
    dateModified!: Date;
    formDate!: Date;
}

export class DocumentInfoEntity {
    id!: number;
    documentId: string = '';
    documentName: string = '';
    documentContent: string = '';
    dateSubmitted!: Date;
    dateModified!: Date;
    case: string = "";
    createdBy: string = "";
    formDate!: Date;
}