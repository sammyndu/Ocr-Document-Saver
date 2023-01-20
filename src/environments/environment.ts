/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: "https://localhost:44303/api",
  //baseUrl: "https://vcdocsaver.centralus.cloudapp.azure.com/20.29.66.88/api",
  //baseUrl: "https://doc-saver22.herokuapp.com/api",
  Dynamsoft: {
    resourcesPath: 'assets/dwt-resources',
    //dwtProductKey: 't00891wAAAKFs7VjcTP0UG20tzpw0mVsqmlIukOMDImLaclVr8l5ReM0df50rg9RNaH7A9mwLt6khlmvJyIqEixQeDZAz0iBvgzHPOXcQA/gbSOY51F46ANDILMM=',
    //dwtProductKey: "t0153KQMAAIUqdItQC3abgGoD5/0UsCjRYeDr/QKFGdi/zE9IB+74OhovmuNo8yi30EDOyB4NOQCAVTmEWcn6SVhliBiFi603VOaG4RhUE+VbSafQGT7Ny4w0g5s6f2Nv3Zk3zotBnc7wgpG5sf6MjZv510P2M/eGF4zMjZu5M36fi37JcAhob5lpZHjByNy0zFcTA9WKXD4/p57g",
    dwtProductKey: 't01529gIAAG2oTyXefjJNA7S8Yf07YVTV3V87tuT4tikX54eqVyA24f6f8WhsuEHHyhekdKKTWckPrkONOWZW6eBJrLYOocrciOVGMTC4NWFbJZ9KMPoG9wbYAWKRI2ivfIEH99tRhQA0A0xA68YPcB7y0ysdhIxAM8AEnIcMYNBJ828qT0LWHlKGQDPABPSQAcxW6fP8AgL1ls4',
    uploadTargetURL: ''
  }
};
