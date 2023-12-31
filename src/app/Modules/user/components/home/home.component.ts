import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FeedService } from 'src/app/Services/feed.service';
import { NgModel } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { EmailFormComponent } from '../email-form/email-form.component';
import { AuthService } from 'src/app/Services/auth.service';
import { FileActivityService } from 'src/app/Services/file-activity.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  faSearch = faSearch;

  feed:any[] = [];

  term: string;

  constructor( private spinner: NgxSpinnerService, private feedService: FeedService, private dialog: MatDialog, private authService: AuthService,
    private fileactivity: FileActivityService){  }

  ngOnInit(): void {

    this.spinner.show(); 

    this.feedService.getFiles().subscribe(
      (data) => {
        this.feed = data["data"];

        this.spinner.hide(); 

        
        
      }
    )
    
  }

  getFileType(fileUrl: string): string {
    if (typeof fileUrl === 'string') {
      const startIndex = fileUrl.lastIndexOf('.');
      const endIndex = fileUrl.indexOf('?');
      const extension = fileUrl.substring(startIndex + 1, endIndex);
      return extension;
    } else {
      // Return a default extension or handle the error condition as needed
      return 'unknown';
    }
  }


  openEmailForm(fileId: number): void{

    const dialogRef = this.dialog.open(EmailFormComponent, {
      width: '400px',
      data: { fileId},
      panelClass: 'email-form-dialog'
    });



    dialogRef.afterOpened().subscribe(() => {
      const dialogContainer = document.querySelector('.email-form-dialog') as HTMLElement;
      dialogContainer.style.position = 'fixed';
      dialogContainer.style.top = '20px';
      dialogContainer.style.left = '50%';
      dialogContainer.style.transform = 'translateX(-50%)';
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result && result.email){
          const email = result.email;
          const file_id = result["fileId"]


          this.fileactivity.sendFileToEmail(file_id, email).subscribe(
            (response) => {
              setTimeout(()=>{
                alert("File Sent to email")
              }, 500)
              
            }
          )

          
        }
      }
    )
  }

  logout(){

    this.authService.logout()


  }


  openDownload(file_id, file_type): void {
    this.spinner.show();
  
    this.feedService.downloadFile(file_id).subscribe(
      (response) => {
        
        
        this.spinner.hide();

        const fileExtension = this.getFileType(response);
  
        const blob = new Blob([response], { type: 'application/octet-stream' });
  
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element to trigger the download
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `file_${file_id}.${file_type}`; 
        document.body.appendChild(anchor);
  
        anchor.click();
  
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        this.spinner.hide();
        console.error('Error downloading file:', error);
      }
    );
  }
  

  
  

}