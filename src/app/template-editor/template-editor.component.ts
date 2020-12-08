import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Template } from '../models/template.model';
import { Actions, Store } from '../services/store.service';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TemplateEditorComponent implements OnInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public templates$: Observable<Template[]>;
  public allowedFontSizes: Array<number> = [16, 21, 28];
  private _range: Range;

  constructor(
    private readonly _store: Store,
    private readonly _renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.templates$ = this._store.get
      .pipe(
        pluck('templates')
      );
  }

  public onMouseUp() {
    this._range = window.getSelection()?.getRangeAt(0);
  }

  public applyFontSize({ value }: { value: number }) {
    this._renderer.setStyle(this._range.startContainer.parentElement, 'font-size', `${value}px`);
    const editedTemplateId = this.getTemplateId(this._range.startContainer.parentElement);
    this._range = null;
    this.saveTemplate(editedTemplateId);
  }

  public applyText(text: string) {
    const textNode = this._renderer.createText(text);;
    const editedTemplateId = this.replaceSelectionAndGetEditedId(textNode);
    this.saveTemplate(+editedTemplateId);
  }

  public replaceSelectionAndGetEditedId(node: Text | HTMLElement): number {
    const selection = window.getSelection();
    const id = this.getTemplateId(this._range.startContainer.parentElement);
    selection.removeAllRanges();
    selection.addRange(this._range);

    this._range.deleteContents();
    this._range.insertNode(node);
    this._range = null;
    selection.removeAllRanges();

    return id;
  }

  private getTemplateId(element: HTMLElement) {
    if (!element) {
      return;
    }
    const id = Number(element.dataset.id);
    return id || this.getTemplateId(element.parentElement);
  }

  private saveTemplate(editedId: number): void {
    const payload: Template[] = [].map.call(this.wrapper.nativeElement.children, (element: HTMLElement) => {
      const { id, name, modified } = element.dataset;
      return { template: element.innerHTML, id, name, modified: Number(id) === editedId ? new Date().getTime() : modified };
    });

    this._store.dispatch({ type: Actions.SAVE_TEMPLATE, payload });
  }

  get isMenuOpen(): boolean {
    return !!this._range?.toString().length;
  }

  get selectedText(): string {
    return this._range?.toString();
  }
}
