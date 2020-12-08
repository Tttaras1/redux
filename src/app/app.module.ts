import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TemlateInfoComponent } from './temlate-info/temlate-info.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TemplateEditorComponent } from './template-editor/template-editor.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TemlateInfoComponent,
    TemplateEditorComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
