export type StemChoice = Array<string>;
export type Stem = string|StemChoice;

export interface StemsModifiers {
    [modifierKey:string]: (s: string) => string;
}

export const defaultModifiers: StemsModifiers = {
    capitalize: function (s: string) { return s.charAt(0).toUpperCase() + s.slice(1); },
    uppercase: function (s: string) { return s.toUpperCase(); },
    lowercase: function (s: string) { return s.toLowerCase(); }
}

/**
  stems embedded in other strings use # as framing
  e.g. "The grand #name#"" will pick a from the name stem
  possibly resulting in "The grand Kate Compton".
*/
export const stemReferenceRegex = /#([\w.]+)#/g

export interface GrammarDefinition {
    origin: Stem;
    [stemReference:string]: Stem;
}

export class Grammar {
    private grammar: GrammarDefinition;
    private modifiers: StemsModifiers;

    constructor (grammar: GrammarDefinition, modifiers: StemsModifiers = defaultModifiers) {
        this.grammar = grammar;
        this.modifiers = modifiers;
    }

    generate (count: number = 1): Array<string> {
        const results = [];
        for (let i = 0; i < count; i++){
            results.push(
                this.expandStem(this.grammar.origin)
            );
        }
        return results;
    }

    expandStem (stem: Stem, modifierKey?: string): string {
        const selectedStem = this.pickStem(stem);
        let expandedStem = this.templateStem(selectedStem);
        if (modifierKey) {
            expandedStem = this.applyModifier(expandedStem, modifierKey);
        }
        return expandedStem;
    }

    pickStem (stem: Stem): string {
        if (typeof stem === "string") {
            return stem;
        } else { // must be Array
            if (stem.length === 0) {
                throw new Error('Cannot pick from empty array.');
            } else {
                // pick from flat array
                return (stem as StemChoice)[Math.floor(Math.random() * stem.length)];
            }
        }
    }

    templateStem (resolvedStem: string): string {
        return resolvedStem.replace(stemReferenceRegex, (_match, stemReferenceMaybeModifier) => {
            const [stemReference, modifierKey] = stemReferenceMaybeModifier.split('.');
            if (this.grammar[stemReference] === undefined) {
                throw new Error(`Missing stem for reference "${stemReference}"`);
            }
            return this.expandStem(this.grammar[stemReference], modifierKey);
        })
    }

    applyModifier (expandedStem: string, modifierKey: string): string {
        if (modifierKey && this.modifiers[modifierKey] === undefined) {
            throw new Error(`Missing modifier function for "${modifierKey}"`);
        }
        return this.modifiers[modifierKey](expandedStem);
    }
}