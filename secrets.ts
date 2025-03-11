import path from 'path';
import fs from 'fs';

export function readSecret(secretName: string): string | undefined {
    try {
        const secretPath = path.join('/run/secrets', secretName);
        const secretValue = fs.readFileSync(secretPath, 'utf8').trim();
        return secretValue;
    } catch (err) {
        console.error(`Failed to read secret ${secretName}:`, err);
        return undefined;
    }
}