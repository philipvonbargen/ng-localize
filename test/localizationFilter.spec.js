'use strict';

describe('Localize filter', () => {
  let LocalizeStorage;
  let $filter;

  let VARIABLES = {
    variablesMultipleUses: ['Sauerkraut', 'Weißbier'],
  };

  // default english localizations
  let LOCALIZATIONS_EN = {
    variablesMultipleUses: '"{1}" equals "{1}" and "{0}" equals "{0}".',
  };

  // expected english strings
  let EXPECTED_EN = {
    variablesMultipleUses: `"${VARIABLES.variablesMultipleUses[1]}" equals "${VARIABLES.variablesMultipleUses[1]}" and "${VARIABLES.variablesMultipleUses[0]}" equals "${VARIABLES.variablesMultipleUses[0]}".`,
  };

  beforeEach(angular.mock.module('localize.filter'));

  beforeEach(angular.mock.inject(($injector) => {
    LocalizeStorage = $injector.get('LocalizeStorage');
    $filter = $injector.get('$filter');

    LocalizeStorage.add('en', LOCALIZATIONS_EN);
  }));

  it('translates a string with multiple uses of the same variable', () => {
    expect($filter('localize')('variablesMultipleUses', VARIABLES.variablesMultipleUses[0], VARIABLES.variablesMultipleUses[1])).toBe(EXPECTED_EN.variablesMultipleUses);
  });

});
