import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { WallComponent } from './wall/wall.component';
import { PageControllerService } from './core/page-controller.service';
import { PartDispatcherService } from './core/part-dispatcher.service';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    WallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatRippleModule
  ],
  providers: [PageControllerService, PartDispatcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
