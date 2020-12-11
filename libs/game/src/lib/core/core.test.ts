import * as chai from 'chai';

const expect = chai.expect;

describe('BBScript Core Library Functions', () => {

    it('should lex and _deprecated_parse a source code correctly', () => {
        let sourceCode = ['Global x = 3', 'While Not KeyHit(1)', 'DebugLog "bla"', 'Wend', 'End'];
        //expect(lexAndParse(sourceCode)).to.equal('');
    });

});
