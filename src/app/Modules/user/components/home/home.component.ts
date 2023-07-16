import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FeedService } from 'src/app/Services/feed.service';
import { NgModel } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { EmailFormComponent } from '../email-form/email-form.component';
import { AuthService } from 'src/app/Services/auth.service';
import { FileActivityService } from 'src/app/Services/file-activity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  faSearch = faSearch;

  feed:any[] = [];

  term: string;

  constructor( private feedService: FeedService, private dialog: MatDialog, private authService: AuthService,
    private fileactivity: FileActivityService){  }

  ngOnInit(): void {

    this.feedService.getFiles().subscribe(
      (data) => {
        this.feed = data["data"];

        console.log(this.feed);
        
      }
    )
    
  }

  getFileType(fileUrl: string): string {
    const startIndex = fileUrl.lastIndexOf('.');
    const endIndex = fileUrl.indexOf('?');
    const extension = fileUrl.substring(startIndex + 1, endIndex);
    return extension;
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

          // console.log(file_id);

          // console.log(email);
          

          this.fileactivity.sendFileToEmail(file_id, email).subscribe(
            (response) => {
              console.log("Worked?");
              
            }
          )

          
        }
      }
    )
  }

  logout(){

    this.authService.logout()


  }


  openDownload(file_id){

    this.fileactivity.downloadFile(file_id).subscribe(
      (response) =>{
        console.log("Downloaded");
        
      }
    )
  }



  
    
  


  

  
  

}
