import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as IdeActions from '../../store/ide.actions';

@Component({
  selector: 'blitz-basic-script-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {
  themes!: string[];
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<any>) {}

  ngOnInit(): void {
    this.themes = ['Ambient', 'Light Mode', 'Dark Mode'];

    this.formGroup = this.formBuilder.group({
      theme: ['', Validators.required],
      indentation: ['', Validators.required],
      autoSave: ['', Validators.required],
      formatCode: ['', Validators.required],
      codeAssistant: ['', Validators.required],
    });
  }

  saveSettings(): void {
    this.store.dispatch(IdeActions.saveEditorSettings());
  }

  cancelSettings(): void {
    this.store.dispatch(IdeActions.cancelEditorSettings());
  }
}
