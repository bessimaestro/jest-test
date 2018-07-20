const sum = require('../sum');

/* setup */
beforeAll(() => {
    console.log('before all do this...')
});

afterAll(() => {
    console.log('after all do this other...')
});

beforeEach(() => {
    console.log('setting up the environment');
});

beforeEach(() => {
    console.log('cleaning up the environment');
});

/* common matchers */
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('object assignment', () => {
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
});

test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});

/* truthiness */
test('n is null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

test('z is zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
});

/* numbers */
test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    // expect(value).toBe(0.3); // This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});

/* strings */
test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});

/* arrays */
const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
});

/* exceptions */
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(Error);

    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
});

/* callbacks */
var fetchData = (callbackFunction) => {
    callbackFunction('peanut butter');
}

test('the data is peanut butter', done => {
    function callback(data) {
        expect(data).toBe('peanut butter');
        done();
    }

    fetchData(callback);
});

/* promises */
var fetchPromise = () => {
    return new Promise(function (resolve, reject) {
        // resolve('peanut butter');
        setTimeout(resolve, 200, 'peanut butter');
    });
}

test('the data is peanut butter', () => {
    expect.assertions(1);
    return fetchPromise().then(data => {
        expect(data).toBe('peanut butter');
    });
});

test('the data is peanut butter', () => {
    expect.assertions(1);
    return expect(fetchPromise()).resolves.toBe('peanut butter');
});

var failPromise = () => {
    return new Promise(function (resolve, reject) {
        reject('error');
    });
}

test('the fetch fails with an error', () => {
    expect.assertions(1);
    return expect(failPromise()).rejects.toMatch('error');
});

/* async await*/
test('the data is peanut butter', async () => {
    expect.assertions(1);
    const data = await fetchPromise();
    expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
        await failPromise();
    } catch (e) {
        expect(e).toMatch('error');
    }
});

test('the data is peanut butter', async () => {
    expect.assertions(1);
    await expect(fetchPromise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    await expect(failPromise()).rejects.toMatch('error');
});
