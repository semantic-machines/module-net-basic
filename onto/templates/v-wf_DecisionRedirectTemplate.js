import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  template.on('kancel', function () {
    const modal = template.closest('.modal');
    if (modal.length) {
      modal.modal('hide');
    } else {
      window.history.back();
    }
  });
};

export const html = `
  <div>
    <div class="view -edit -search">
      <span rel="v-s:creator">
        <span>
          <strong rel="v-s:employee" data-template="v-ui:LabelTemplate"></strong>
          <small rel="v-s:occupation" data-template="v-ui:LabelTemplate"></small>
        </span>
      </span>
      <small>
        <span>&bullet;&nbsp;&nbsp;</span>
        <span property="v-s:created"></span>
      </small>
      <hr class="margin-sm" />
    </div>
    <h4 class="decision" about="@" property="rdfs:label"></h4>
    <em about="v-wf:to" property="rdfs:label"></em>
    <div rel="v-wf:to" data-template="v-ui:LabelTemplate" class="view -edit -search"></div>
    <veda-control rel="v-wf:to" data-type="link" class="-view edit search fulltext"></veda-control>
    <em about="rdfs:comment" property="rdfs:label"></em>
    <div property="rdfs:comment" class="view -edit -search"></div>
    <veda-control property="rdfs:comment" data-type="text" class="-view edit search"></veda-control>
    <br class="-view edit -search" />
    <div class="actions -view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send cancel"></span>
    </div>
  </div>
`;
