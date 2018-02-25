/**
   * Gets the path to the user's node modules
   *
   * @function getNodeModulePrefix
   * @return {promise} resolves as node module prefix
   */
  function getNodeModulePrefix() {
    return new Promise((resolve, reject) => {
      exec('npm config -g get prefix', (err, prefix) => {
        if (err) { return reject(err); }
        resolve(`${prefix.trim()}/lib/node_modules/`);
      })
    })
  }

  /*
   * Get's the path to the user's node modules
   *
   * @async
   * @function tryGetNodeModulePrefix
   * @return {string} node module prefix
   */
  async function tryGetNodeModulePrefix() {
    try {
      return await getNodeModulePrefix();
    } catch (err) {
      console.log('Error: unable to get node_module prefix. Do you have npm installed?')
      console.log(err) // eslint-disable-line no-console
      process.exit();
    }
  }

  /*
   * Attempt a node module require
   *
   * @async
   * @function tryRequire
   * @param {string} pkg - package name
   * @return {string} node module prefix
   */
  async function tryRequire(pkg) {
    const prefix = await tryGetNodeModulePrefix();
    try {
      return require(pkg);
    } catch (err) {
      console.log(`Error: Please run 'npm install -g ${pkg}' to continue\n`);
      console.log(err);
      process.exit();
    }
  }