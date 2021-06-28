import { keys } from '../src/keys';


test('checking if the pixabay key is included', () => {
    expect(keys('PIXABAY_API_KEY')).not.toBe('');
});
