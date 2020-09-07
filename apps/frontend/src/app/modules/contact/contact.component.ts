import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { environment } from '../../../environments/environment';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'blitz-basic-script-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  section: 'form' | 'success' | 'error';
  notices: object;

  name: string;
  email: string;
  subject: string;
  message: string;
  dataAgreementAccepted: boolean;

  sendingRequest: boolean;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.section = 'form';
    this.notices = {};

    this.name = '';
    this.email = '';
    this.subject = 'bbscript';
    this.message = '';
    this.dataAgreementAccepted = false;
  }

  send(): void {
    this.name = this.name.trim();
    this.email = this.email.trim();
    this.notices = {};

    if (this.name.length < 2) {
      this.notices['name-too-short'] = true;
    } else if (this.name.length > 32) {
      this.notices['name-too-long'] = true;
    } else if (!environment.generalNameRegex.test(this.name)) {
      this.notices['name-must-be-alphanumeric'] = true;
    }

    if (this.email.length === 0) {
      this.notices['email-empty'] = true;
    } else if (!environment.emailRegex.test(this.email)) {
      this.notices['email-invalid'] = true;
    }

    if (this.message.length === 0) {
      this.notices['message-empty'] = true;
    }

    if (!this.dataAgreementAccepted) {
      this.notices['data-agreement-must-be-accepted'] = true;
    }

    // console.info('[NOTICES]', this.notices);

    if (Object.keys(this.notices).length === 0) {
      this.sendingRequest = true;

      this.contactService
        .sendMessage(
          this.name,
          this.email,
          this.subject,
          this.message.replace(/ /g, '&nbsp;').replace(/\r?\n/g, '<br />')
        )
        .then((response: ApiResponse<any>) => {
          if (response.status === 'success') {
            this.section = 'success';
          } else {
            console.error('[MESSAGE SENDING ERROR]', response);
            this.section = 'error';
          }
          this.sendingRequest = false;
        });
    }
  }
}
