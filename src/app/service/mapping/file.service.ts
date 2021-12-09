import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from 'app/model/file';
import { Observable, Subject } from 'rxjs';
import { UserAuthService } from '../user/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = "http://localhost:8080";

  fileListSubject = new Subject<File[]>();
  fileList: File[] = [];

  requestHeader = new HttpHeaders(
    {
      "No-Auth": "True"
    }
  );

  constructor(private httpClient: HttpClient,
              private userAuthService: UserAuthService) { }

  emitFileList() {
    this.fileListSubject.next(this.fileList);
  }

  public getFileList(): Observable<File[]> {
    return this.httpClient.get<File[]>(this.baseUrl + "/file/files");
  }

  public getFiles(){
    this.getFileList().subscribe(data => {
      this.fileList = data;
      this.emitFileList();
    },
      error => console.log(error)
    );
  }

  public uploadFile(formData: FormData): Observable<Object> {
    return this.httpClient.post<FormData>(this.baseUrl + "/file/directory",formData,{reportProgress: true});
  }

  public getDataStructure(separator: String, filename): Observable<Object> {
    return this.httpClient.get(this.baseUrl + "/file/data?separator=" + separator + "&filename=" + filename);
  }

  public generateFile(file: File): Observable<Object> {
    return this.httpClient.post<File>(this.baseUrl + "/file/generate/column", file);
  }

  public generateFileLineOutput(file: File): Observable<Object> {
    return this.httpClient.post<File>(this.baseUrl + "/file/generate/line", file);
  }

}
