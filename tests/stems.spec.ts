import { Grammar, GrammarDefinition } from '../index';
import * as roomGrammarDef from './rooms.grammar.json';

const testGrammarADef: GrammarDefinition = {
    origin: '#firstname# #lastname#',
    firstname: ['Joe', 'Dave', 'Kevin'],
    lastname: '#lastnameStart##lastnameEnd#',
    lastnameStart: ['Wab', 'Tre', 'Dan'],
    lastnameEnd: ['owski', 'rock', 'maine']
}

const testGrammarA = new Grammar(testGrammarADef);
console.log(
    'generating 3 from test grammar',
    testGrammarA.generate(3)
);

const testGrammarBDef: GrammarDefinition = {
    cases: ['WAS_UPPER', 'was_lower', 'mIxEd_CAsE!'],
    origin: '#cases.uppercase# #cases.lowercase# #cases#'
}

const testGrammarB = new Grammar(testGrammarBDef);
console.log(
    'generating 12 from test grammar',
    testGrammarB.generate(12)
);

const nameGrammar = new Grammar(roomGrammarDef as GrammarDefinition);
const names = nameGrammar.generate(5);

console.log(
    'generating 5 rooms from room grammar (json)',
    names
);