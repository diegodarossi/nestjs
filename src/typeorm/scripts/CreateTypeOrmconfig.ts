import { DbConfiguration } from '../DbConfiguration';
import fs = require('fs');

fs.writeFileSync('ormconfig.json', JSON.stringify(DbConfiguration.get(), null, 2));