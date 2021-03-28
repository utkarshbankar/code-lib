# Template-driven forms

Forms are the mainstay of business applications.
You use forms to log in, submit a help request, place an order, book a flight,
schedule a meeting, and perform countless other data-entry tasks.


In developing a form, it's important to create a data-entry experience that guides the
user efficiently and effectively through the workflow.

## Introduction to Template-driven forms

Developing forms requires design skills (which are out of scope for this page), as well as framework support for
*two-way data binding, change tracking, validation, and error handling*,
which you'll learn about on this page.

This page shows you how to build a simple form from scratch. Along the way you'll learn how to:

* Build an Angular form with a component and template.
* Use `ngModel` to create two-way data bindings for reading and writing input-control values.
* Track state changes and the validity of form controls.
* Provide visual feedback using special CSS classes that track the state of the controls.
* Display validation errors to users and enable/disable form controls.
* Share information across HTML elements using template reference variables.

You can run the <live-example></live-example> in Stackblitz and download the code from there.

{@a template-driven}

You can build forms by writing templates in the Angular [template syntax](guide/template-syntax) with
the form-specific directives and techniques described in this page.

<div class="alert is-helpful">

  You can also use a reactive (or model-driven) approach to build forms.
  However, this page focuses on template-driven forms.

</div>


