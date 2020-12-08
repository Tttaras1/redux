import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATE } from './app.constants';
import { TemlateInfoComponent } from './temlate-info/temlate-info.component';
import { TemplateEditorComponent } from './template-editor/template-editor.component';

const routes: Routes = [
    {
        path: '', redirectTo: `/${NAVIGATE.TEMPLATE_INFO}`, pathMatch: 'full'
    },
    {
        path: NAVIGATE.TEMPLATE_INFO, component: TemlateInfoComponent
    },
    {
        path: NAVIGATE.TEMPLATE, component: TemplateEditorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
