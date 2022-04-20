import { DocumentInfoEntity } from './../models/document-info.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentInfo } from '../models/document-info.model';
import { Observable } from 'rxjs';
import { SearchDocument } from '../models/search-document.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/response.model';

@Injectable()
export class DocumentService {

    apiBaseUrl: string

    constructor(private http: HttpClient) {
        this.apiBaseUrl = environment.baseUrl + '/DocumentSaver';
    }

    addDocument(data: DocumentInfo): Observable<any>  {
    //     const formData = new FormData(); 
        
    //   // Store form name as "file" with file data
    //   formData.append("documentId", data.documentId);

    //   formData.append("documentName", data.documentName);

    //   formData.append("documentContent", data.documentContent);
        
    //   // Make http post request over api
    //   // with formData as req
    //   return this.http.post(this.baseApiUrl, formData)

        return this.http.post(this.apiBaseUrl, data);
    }

    getDocuments(): Observable<ApiResponse<DocumentInfoEntity[]>> {
        return this.http.get<ApiResponse<DocumentInfoEntity[]>>(this.apiBaseUrl);
    }

    getDocument(id: number)  {
        return this.http.get<ApiResponse<DocumentInfo>>(`${this.apiBaseUrl}/${id}`);
    }

    updateDocument(id: number, data: DocumentInfo)  {
        return this.http.put<ApiResponse<DocumentInfo>>(`${this.apiBaseUrl}/${id}`, data);
    }

    deleteDocument(id: number): Observable<any>  {
        return this.http.delete(`${this.apiBaseUrl}/${id}`);
    }

    searchDocument(data: SearchDocument) {
    
        return this.http.post<ApiResponse<DocumentInfo[]>>(`${this.apiBaseUrl}/search`, data);
    }
    

}
