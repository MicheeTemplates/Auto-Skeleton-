import { describe, it, expect } from 'vitest';
import { probe } from './probe';

describe('probe', () => {
    it('should measure element dimensions', () => {
        const el = document.createElement('div');
        el.style.width = '100px';
        el.style.height = '50px';
        document.body.appendChild(el);

        const result = probe(el);
        expect(result).toBeDefined();

        document.body.removeChild(el);
    });
});
