/* global before, after, beforeEach, describe, it */

const assert             = require('chai').assert,
      fs                 = require('fs'),
      path               = require('path'),
      parse              = require('../index');


describe('parser tests', function() {
    let block, json;

    before('load test block', function() {
        block = fs.readFileSync(path.resolve('./test/table-beauty.comb')).toString();
        json  = JSON.parse(fs.readFileSync(path.resolve('./test/table-beauty.json')));
    });

    it('parse table block', function() {
        let tree = parse(block);

        tree = JSON.parse(JSON.stringify(tree));

        assert.deepEqual(tree, json);
    });
});