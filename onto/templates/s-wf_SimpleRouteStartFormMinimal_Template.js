import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('.sign .checkbox').show();
};

export const html = `
  <div>
    <em>
      <span about="s-wf:SimpleRouteStartForm_participant" property="rdfs:label"></span>
      <span about="@" property="v-s:description" class="view edit -search"></span>
    </em>
    <div rel="s-wf:SimpleRouteStartForm_participant" class="view edit -search" data-template="v-ui:LabelTemplate"></div>
    <veda-control data-type="link" rel="s-wf:SimpleRouteStartForm_participant" class="-view edit search fulltext"></veda-control>
    <em about="s-wf:SimpleRouteStartForm_comment" property="rdfs:label"></em>
    <div property="s-wf:SimpleRouteStartForm_comment" class="view -edit -search"></div>
    <veda-control data-type="text" property="s-wf:SimpleRouteStartForm_comment" class="-view edit -search"></veda-control>
    <div class="checkbox checkbox_canEdit disabled">
      <label>
        <veda-control property="v-wf:StartForm_canEdit" data-type="boolean"></veda-control>
        <span about="v-wf:StartForm_canEdit" property="rdfs:label"></span>
      </label>
    </div>
  </div>
`;
