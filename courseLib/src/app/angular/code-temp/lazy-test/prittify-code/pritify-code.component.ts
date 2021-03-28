
// #docregion imports
import {
  Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { PrittyViewService } from '../../pritty-view.service';
import { tap } from "rxjs/operators";

@Component({
  selector: 'pritify-view',
  template: `
  <div class="code-wrapper">
  <pre>
   <code #codeContainer>
     <div>{{ codeStr }}</div>
   </code>
  </pre>
  </div>
  `
  , styleUrls: ['./pritify-code.component.css']
  , encapsulation: ViewEncapsulation.None
})

// #enddocregion imports
export class PritifyCodeComponent implements OnChanges {

  /** 
  * aio/content/examples/reactive-forms/src/app/app.module.ts
  */
  /** The code to be copied when clicking the copy button, this should not be HTML encoded */
  @Input() codeStr: string;
  // `import { Component } from '@angular/core';
  // @Component({ 
  //     selector:   'app-comp',
  //     templateUrl:'./template.path',OR tempLate:'your Embeded Html Template',
  //     styleUrls:  './styles url', OR styles: 'your embeded style' ,
  //     providers: ['serviceName'],
  //     encapsulation: 'ViewEncapsulation.None'
  //   });
  // export Class AppComponent{ }  
  // `
  public conceptDescArr = [
    'These are the building blocks of angular application',
    'At lest root one comp in a application',
    'Root component connect component hierarchy with page DOM',
    'It contain application associated with HTML template',
    '@Component is decorator used to identify the class is an component'
  ]
  //   {'pt-1':'These are the building blocks of angular application'},
  //   {'pt-2':'At lest root one comp in a application'},
  //   {'pt-3':'Root component connect component hierarchy with page DOM'},
  //   {'pt-4':'It contain application associated with HTML template'},
  //   {'pt-5':'@Component is decorator used to identify the class is an component'}
  // ];
  private codeText: string;
  private language: string = "ts";

  /** Code that should be formatted with current inputs and displayed in the view. */
  set code(code: string) {
    this._code = code;

    if (!this._code || !this._code.trim()) {
      this.showMissingCodeMessage();
    } else {
      this.formatDisplayedCode();
    }
  }
  get code(): string { return this._code; }
  _code: string;

  /**
   * Whether to display line numbers:
   *  - If false: hide
   *  - If true: show
   *  - If number: show but start at that number
   */
  @Input() linenums: boolean | number | string | undefined;

  @Output() codeFormatted = new EventEmitter<void>();
  /** The element in the template that will display the formatted code. */
  @ViewChild('codeContainer', { static: true }) codeContainer: ElementRef;

  @Input() path;
  @Input() region;

  constructor(private codeTemp: PrittyViewService) { }

  ngOnChanges() {
    // If some inputs have changed and there is code displayed, update the view with the latest
    // formatted code.
    if (!this.code) {
      this.formatDisplayedCode();
    }
  }

  private formatDisplayedCode() {
    if (this.code) {
      const leftAlignedCode = leftAlign(this.code);
      this.setCodeHtml(leftAlignedCode); // start with unformatted code
      this.codeText = this.getCodeText(); // store the unformatted code as text (for copying)

      this.codeTemp.formatCode(leftAlignedCode, this.language, this.getLinenums()).subscribe(da => {
        this.setCodeHtml(da);
      });
      //.pipe(tap(() => this.codeFormatted.emit()))
      //.subscribe(c => this.setCodeHtml(c), () => { /* ignore failure to format */ }
      //);
    }

  }

  /** Sets the message showing that the code could not be found. */
  private showMissingCodeMessage() {
    const src = this.path ? this.path + (this.region ? '#' + this.region : '') : '';
    const srcMsg = src ? ` for\n${src}` : '.';
    //const srcMsg = "Hello Soruce static";
    this.setCodeHtml(`<p class="code-missing">The code sample is missing${srcMsg}</p>`);
  }


  /** Sets the innerHTML of the code container to the provided code string. */
  private setCodeHtml(formattedCode: string) {
    // **Security:** Code example content is provided by docs authors and as such its considered to
    // be safe for innerHTML purposes.
    this.codeContainer.nativeElement.innerHTML = formattedCode;
  }

  /** Gets the textContent of the displayed code element. */
  private getCodeText() {
    // `prettify` may remove newlines, e.g. when `linenums` are on. Retrieve the content of the
    // container as text, before prettifying it.
    // We take the textContent because we don't want it to be HTML encoded.
    return this.codeContainer.nativeElement.textContent;
  }

  getLinenums() {
    const linenums =
      typeof this.linenums === 'boolean' ? this.linenums :
        this.linenums === 'true' ? true :
          this.linenums === 'false' ? false :
            typeof this.linenums === 'string' ? parseInt(this.linenums, 10) :
              this.linenums;

    return (linenums != null) && !isNaN(linenums as number) && linenums;
  }

}

function leftAlign(text: string): string {
  let indent = Number.MAX_VALUE;

  const lines = text.split('\n');
  lines.forEach(line => {
    const lineIndent = line.search(/\S/);
    if (lineIndent !== -1) {
      indent = Math.min(lineIndent, indent);
    }
  });

  return lines.map(line => line.substr(indent)).join('\n').trim();
}
