import { Injectable } from '@angular/core';

interface Script {
  name: string;
  src: string;
}

export const scriptStore: Script[] = [
  { name: 'expiviScript', src: 'https://admin.expivi.net/widgets/assets/v1.444/viewer.js' }
];

@Injectable({
  providedIn: 'root'
})
export class AugmentedViewerService {

  private queuedScripts: { [name: string ]: { loaded: boolean, src: string }} = {};

  constructor() {
    scriptStore.forEach((script: Script) => {
        this.queuedScripts[script.name] = {
            loaded: false,
            src: script.src,
        };
    });
  }

  load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }


  loadScript(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
        //resolve if already loaded
        if (this.queuedScripts[name].loaded) {
            resolve({script: name, loaded: true, status: 'Already Loaded'});
        } else {
          //load script
          let script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = this.queuedScripts[name].src;
          script.onload = () => {
              this.queuedScripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
          };
          script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
          document.getElementsByTagName('head')[0].appendChild(script);
        }
    });
  }
}
