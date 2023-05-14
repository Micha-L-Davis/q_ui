const { mergeState } = require('../index');

describe('mergeState', () => {
  test('should merge two states with overwrite enabled', () => {
    const state1 = {
      key1: 'value1',
      key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: 'nestedValue2',
      },
    };

    const state2 = {
      key2: {
        nestedKey2: 'updatedNestedValue2',
        nestedKey3: 'nestedValue3',
      },
      key3: 'value3',
    };

    const expectedState = {
      key1: 'value1',
      key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: 'updatedNestedValue2',
        nestedKey3: 'nestedValue3',
      },
      key3: 'value3',
    };

    const mergedState = mergeState(state1, state2, true);

    expect(mergedState).toEqual(expectedState);
  });

  test('should merge two states with overwrite disabled', () => {
    const state1 = {
      key1: 'value1',
      key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: 'nestedValue2',
      },
    };

    const state2 = {
      key2: {
        nestedKey2: 'updatedNestedValue2',
        nestedKey3: 'nestedValue3',
      },
      key3: 'value3',
    };

    const expectedState = {
      key1: 'value1',
      key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: 'nestedValue2',
        nestedKey3: 'nestedValue3',
      },
      key3: 'value3',
    };

    const mergedState = mergeState(state1, state2, false);

    expect(mergedState).toEqual(expectedState);
  });
});
