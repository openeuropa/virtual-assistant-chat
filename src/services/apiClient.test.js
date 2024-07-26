import { expect, test } from 'vitest'
import newInstance from "./apiClient.js";

test('reada specs correctly', async () => {
    const api = await newInstance('');
    api.init();
    expect(api.document.openapi).toBe("3.1.0");
})