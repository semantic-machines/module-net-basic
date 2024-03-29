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

  template.on('kancel', function () {
    const modal = template.closest('.modal');
    if (modal.length) {
      modal.modal('hide');
    } else {
      window.history.back();
    }
  });
  $('#add-controller', template).click(function () {
    individual['v-s:controller'] = [veda.appointment];
  });
};

export const html = `
  <div class="container sheet">
    <h3>
      <span about="v-df:SignRouteStartForm" property="rdfs:label"></span><br />
      <small about="@" property="rdfs:label"></small>
    </h3>
    <div class="row">
      <div class="col-md-6">
        <em about="v-s:responsible" property="rdfs:label"></em>
        <div rel="v-s:responsible" data-template="v-ui:LabelTemplate" class="view edit -search"></div>
        <veda-control rel="v-s:responsible" data-type="link" class="-view edit search fulltext"></veda-control>
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
    <div class="-view edit -search">
      <button class="btn btn-xs margin-sm btn-primary pull-right -view edit search" id="add-controller" data-toggle="tooltip" title="Назначить себя">
        <span class="glyphicon glyphicon-user"></span>
      </button>
      <em about="v-df:NotifyUponTermination_Bundle" property="rdfs:label"></em>
    </div>
    <div rel="v-s:controller" data-template="v-ui:LabelTemplate" class="view -edit -search"></div>
    <veda-control rel="v-s:controller" data-type="link" class="-view edit search fulltext"></veda-control>
    <br />
    <div class="actions -view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send cancel"></span>
    </div>
  </div>
`;
