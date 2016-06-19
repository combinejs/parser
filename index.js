'use strict';

const nodeParse = require('./lib/node-parse');

/**
 *
 * @param string
 *
 * @returns {CombineNode}
 */
module.exports = function(string) {
    if (typeof string !== 'string') {
        throw Error('parse need string');
    }

    let state = new ParseState(string),
        stack = [];

    try {
        do {
            let node = nodeParse(state);

            if (state.indent > 0) {
                stack[state.indent - 1].addChild(node);
            }

            stack[state.indent] = node;
        } while (! state.isEOF);
    } catch (e) {
        throw Error('parse error');
    }

    return stack[0];
};

class ParseState {
    constructor(string) {
        this.string = string;
        this.lastBlockName = null;
        this.index  = 0;
        this.line   = 0;
        this.isEOF  = false;
    }

    execRegexp(regexp) {
        regexp.lastIndex = this.index;
        let result       = regexp.exec(this.string);
        this.index       = regexp.lastIndex;

        return result;
    }
}
