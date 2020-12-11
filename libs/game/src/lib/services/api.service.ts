import {HttpClient} from '@angular/common/http';

export class ApiService {
    constructor(private http: HttpClient) {

    }

    getAllKeyWords(callback: (data) => any) {
        this.http.get('http://api.blitzbasicscript.com/keywords?deprecated=false').subscribe((response) => {
            return response;
        });
    }

    getKeyWords(deprecated?: boolean): object {
        //TODO fix ajax request later
        let keywords = [
            {'id': '1', 'name': 'Case', 'deprecated': '0'}, {'id': '2', 'name': 'Default', 'deprecated': '0'}, {
                'id': '3',
                'name': 'Else',
                'deprecated': '0'
            }, {'id': '4', 'name': 'ElseIf', 'deprecated': '0'}, {'id': '5', 'name': 'EndIf', 'deprecated': '0'}, {
                'id': '6',
                'name': 'If',
                'deprecated': '0'
            }, {'id': '7', 'name': 'Select', 'deprecated': '0'}, {'id': '8', 'name': 'Then', 'deprecated': '0'}, {
                'id': '9',
                'name': 'After',
                'deprecated': '0'
            }, {'id': '10', 'name': 'Before', 'deprecated': '0'}, {
                'id': '11',
                'name': 'Delete',
                'deprecated': '0'
            }, {'id': '12', 'name': 'First', 'deprecated': '0'}, {
                'id': '13',
                'name': 'Insert',
                'deprecated': '0'
            }, {'id': '14', 'name': 'Last', 'deprecated': '0'}, {'id': '15', 'name': 'New', 'deprecated': '0'}, {
                'id': '16',
                'name': 'Null',
                'deprecated': '0'
            }, {'id': '17', 'name': 'Object', 'deprecated': '0'}, {
                'id': '18',
                'name': 'Type',
                'deprecated': '0'
            }, {'id': '19', 'name': 'Field', 'deprecated': '0'}, {'id': '20', 'name': 'End', 'deprecated': '0'}, {
                'id': '21',
                'name': 'Include',
                'deprecated': '0'
            }, {'id': '22', 'name': 'Stop', 'deprecated': '0'}, {'id': '23', 'name': 'Data', 'deprecated': '0'}, {
                'id': '24',
                'name': 'Dim',
                'deprecated': '0'
            }, {'id': '25', 'name': 'Global', 'deprecated': '0'}, {
                'id': '26',
                'name': 'Local',
                'deprecated': '0'
            }, {'id': '27', 'name': 'Each', 'deprecated': '0'}, {'id': '28', 'name': 'Const', 'deprecated': '0'}, {
                'id': '29',
                'name': 'MainLoop',
                'deprecated': '0'
            }, {'id': '30', 'name': 'Return', 'deprecated': '0'}, {
                'id': '31',
                'name': 'Exit',
                'deprecated': '0'
            }, {'id': '32', 'name': 'For', 'deprecated': '0'}, {
                'id': '33',
                'name': 'Forever',
                'deprecated': '0'
            }, {'id': '34', 'name': 'Next', 'deprecated': '0'}, {
                'id': '35',
                'name': 'Repeat',
                'deprecated': '0'
            }, {'id': '36', 'name': 'Step', 'deprecated': '0'}, {'id': '37', 'name': 'To', 'deprecated': '0'}, {
                'id': '38',
                'name': 'Until',
                'deprecated': '0'
            }, {'id': '39', 'name': 'Wend', 'deprecated': '0'}, {'id': '40', 'name': 'While', 'deprecated': '0'}, {
                'id': '41',
                'name': 'Mod',
                'deprecated': '0'
            }, {'id': '42', 'name': 'Not', 'deprecated': '0'}, {'id': '43', 'name': 'And', 'deprecated': '0'}, {
                'id': '44',
                'name': 'Or',
                'deprecated': '0'
            }, {'id': '45', 'name': 'Xor', 'deprecated': '0'}, {
                'id': '46',
                'name': 'Function',
                'deprecated': '0'
            }, {'id': '47', 'name': 'False', 'deprecated': '0'}, {'id': '48', 'name': 'True', 'deprecated': '0'}, {
                'id': '51',
                'name': 'Restore',
                'deprecated': '0'
            }, {'id': '52', 'name': 'Read', 'deprecated': '0'}, {
                'id': '53',
                'name': 'Handle',
                'deprecated': '0'
            }, {'id': '54', 'name': 'Pi', 'deprecated': '0'}, {'id': '55', 'name': 'Sar', 'deprecated': '0'}, {
                'id': '57',
                'name': 'Shr',
                'deprecated': '0'
            }
        ];

        let result = {};
        keywords.forEach((keyword) => {
            result[keyword.name.toLowerCase()] = {bbscript: keyword.name};
        });

        return result;
    }
}
