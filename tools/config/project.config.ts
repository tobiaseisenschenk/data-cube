import { join } from 'path';
import { argv } from 'yargs';
import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'UX-Data-Cube';
    this.ENABLE_SCSS = argv['scss'] || true;
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;
    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      {src: `${this.ASSETS_SRC}/sass/main.scss`, inject: true}
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)
     let additionalPackages: ExtendPackages[] = [];

    // Firebase
    additionalPackages.push({
      name: 'firebase',
      path: `${this.NPM_BASE}firebase/`,
      packageMeta: {
        main: 'firebase.js',
        defaultExtension: 'js'
      }
    });
    // ANGULARFIRE 2
    additionalPackages.push({
      name: 'angularfire2',
      path: `${this.NPM_BASE}angularfire2/bundles/angularfire2.umd.js`,
      packageMeta: {
        main: 'angularfire2.umd.js',
        defaultExtension: 'js'
      }
    });
    // HAMMERJS
    additionalPackages.push({
      name: 'hammerjs',
      path: `${this.NPM_BASE}/hammerjs/hammer.js`,
      packageMeta: {
        main: 'hammer.js',
        defaultExtension: 'js'
      }
    });
    // ANGULAR2-MATERIAL
    additionalPackages.push({
      name: '@angular/material',
      path: `${this.NPM_BASE}/@angular/material/bundles/material.umd.js`,
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    });
    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
