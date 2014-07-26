// Copyright 2014 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

suite('comments.js', function() {
  var errorReporter = {
    reportError: function(position, message) {
      throw new chai.AssertionError({message: message + ', ' + position});
    }
  };

  setup(function() {
    traceur.options.attachComments = true;
  });

  teardown(function() {
    traceur.options.reset();
  });

  function parseScript(program) {
    var sourceFile = new traceur.syntax.SourceFile('Name', program);
    var parser = new traceur.syntax.Parser(sourceFile, errorReporter);
    return parser.parseScript();
  }

  test('basic leading comment', function() {
    var program = '//foo\nbar;';
    var ast = parseScript(program);

    console.log(require("util").inspect(ast.scriptItemList[0]));
    assert.equal(ast.scriptItemList[0].leadingComments[0].content(), "//foo\n");
  });

  test('basic trailing comment', function() {
    var program = 'bar;//foo';
    var ast = parseScript(program);

    assert.equal(ast.scriptItemList[0].trailingComments[0].content(), "//foo");
  });
});