/**
 * @fileoverview Changes the permissions of a file.
 * @module scripts/chmod
 */

const fs = require('fs')

fs.chmodSync(process.argv[2], 0o777)
