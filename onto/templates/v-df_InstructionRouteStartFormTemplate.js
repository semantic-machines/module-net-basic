import $ from 'jquery';
import veda from '/js/common/veda.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const processedDocument = individual['v-wf:processedDocument'][0];
  if (processedDocument) {
    return processedDocument.rights.then(function (rights) {
      if (!rights.hasValue('v-s:canUpdate', true)) {
        $('#set-canEdit', template).remove();
      }
    });
  }
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode === 'edit' && this.isNew()) {
    this['v-s:controller'] = [veda.appointment ? veda.appointment : veda.user];
  }
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
  <div class="container sheet">
    <h3>
      <span about="v-df:InstructionRouteStartForm" property="rdfs:label"></span><br />
      <small about="@" property="rdfs:label"></small>
    </h3>
    <!--em about="v-wf:processedDocument" property="rdfs:label"></em>
  <div about="@" rel="v-wf:processedDocument" data-template="v-ui:ClassNameLabelLinkTemplate" class="view edit search"></div-->
    <div class="row">
      <div class="col-md-6">
        <em about="v-s:responsible" property="rdfs:label"></em>
        <div rel="v-s:responsible" data-template="v-ui:LabelTemplate" class="view edit -search"></div>
        <veda-control rel="v-s:responsible" data-type="actor" data-actor-type="v-s:Appointment" class="-view edit search fulltext"></veda-control>
      </div>
      <div class="col-md-4">
        <em about="s-wf:SimpleRouteStartForm_deadlineDate" property="rdfs:label"></em>
        <div property="v-s:dateTo" class="view -edit -search"></div>
        <veda-control property="v-s:dateTo" data-type="dateTime" class="-view edit search"></veda-control>
      </div>
    </div>
    <em about="rdfs:comment" property="rdfs:label"></em>
    <div property="rdfs:comment" class="view -edit -search"></div>
    <veda-control property="rdfs:comment" rows="3" data-type="text" class="-view edit search"></veda-control>
    <div class="checkbox" id="set-canEdit">
      <label>
        <veda-control property="v-wf:StartForm_canEdit" data-type="boolean"></veda-control>
        <span about="v-wf:StartForm_canEdit" property="rdfs:label"></span>
      </label>
    </div>
    <div class="checkbox" id="process-setStatus" style="display:none">
      <label>
        <veda-control property="v-wf:StartForm_setStatus" data-type="boolean"></veda-control>
        <span about="v-wf:StartForm_setStatus" property="rdfs:label"></span>
      </label>
    </div>
    <em about="v-s:controller" property="rdfs:label"></em>
    <div rel="v-s:controller" data-template="v-ui:LabelTemplate" class="view -edit -search"></div>
    <veda-control rel="v-s:controller" data-type="link" class="-view edit search fulltext"></veda-control>
    <br />
    <div class="actions -view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send cancel"></span>
    </div>
  </div>
`;
