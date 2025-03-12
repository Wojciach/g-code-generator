import fs from 'fs';
import path from 'path';

const timestamp = new Date().toISOString();
const timestampFilePath = path.join(process.cwd(), 'public', 'build-timestamp.txt');

fs.writeFileSync(timestampFilePath, `Build timestamp: ${timestamp}\n`, 'utf8');
console.log(`Build timestamp ${timestamp} written to ${timestampFilePath}`);