// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Cls = (app.views.Results = class Results extends app.View {
  static initClass() {
    this.className = '_list';
  
    this.events =
      {click: 'onClick'};
  
    this.routes =
      {after: 'afterRoute'};
  }

  constructor(sidebar, search) { this.onResults = this.onResults.bind(this);   this.onNoResults = this.onNoResults.bind(this);   this.onClear = this.onClear.bind(this);   this.afterRoute = this.afterRoute.bind(this);   this.onClick = this.onClick.bind(this);   this.sidebar = sidebar; this.search = search; super(...arguments); }

  deactivate() {
    if (super.deactivate(...arguments)) {
      this.empty();
    }
  }

  init() {
    this.addSubview(this.listFocus  = new app.views.ListFocus(this.el));
    this.addSubview(this.listSelect = new app.views.ListSelect(this.el));

    this.search
      .on('results', this.onResults)
      .on('noresults', this.onNoResults)
      .on('clear', this.onClear);
  }

  onResults(entries, flags) {
    if (flags.initialResults) { if (this.listFocus != null) {
      this.listFocus.blur();
    } }
    if (flags.initialResults) { this.empty(); }
    this.append(this.tmpl('sidebarResult', entries));

    if (flags.initialResults) {
      if (flags.urlSearch) { this.openFirst(); } else { this.focusFirst(); }
    }
  }

  onNoResults() {
    this.html(this.tmpl('sidebarNoResults'));
  }

  onClear() {
    this.empty();
  }

  focusFirst() {
    if (!app.isMobile()) { if (this.listFocus != null) {
      this.listFocus.focusOnNextFrame(this.el.firstElementChild);
    } }
  }

  openFirst() {
    if (this.el.firstElementChild != null) {
      this.el.firstElementChild.click();
    }
  }

  onDocEnabled(doc) {
    app.router.show(doc.fullPath());
    return this.sidebar.onDocEnabled();
  }

  afterRoute(route, context) {
    if (route === 'entry') {
      this.listSelect.selectByHref(context.entry.fullPath());
    } else {
      this.listSelect.deselect();
    }
  }

  onClick(event) {
    let slug;
    if (event.which !== 1) { return; }
    if (slug = $.eventTarget(event).getAttribute('data-enable')) {
      $.stopEvent(event);
      const doc = app.disabledDocs.findBy('slug', slug);
      if (doc) { return app.enableDoc(doc, this.onDocEnabled.bind(this, doc), $.noop); }
    }
  }
});
Cls.initClass();
