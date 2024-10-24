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
    <div class="row">
      <div class="col-md-6">
        <em about="s-wf:SimpleRouteStartForm_deadlineDate" property="rdfs:label"></em>
        <div property="s-wf:SimpleRouteStartForm_deadlineDate" class="view -edit -search"></div>
        <veda-control data-type="dateTime" property="s-wf:SimpleRouteStartForm_deadlineDate" class="-view edit -search"></veda-control>
      </div>
      <div class="col-md-6">
        <em about="s-wf:SimpleRouteStartForm_deadlineDays" property="rdfs:label"></em>
        <div property="s-wf:SimpleRouteStartForm_deadlineDays" class="view -edit -search"></div>
        <veda-control data-type="integer" property="s-wf:SimpleRouteStartForm_deadlineDays" class="-view edit -search"></veda-control>
      </div>
    </div>
    <div class="checkbox checkbox_canEdit disabled">
      <label>
        <veda-control property="v-wf:StartForm_canEdit" data-type="boolean"></veda-control>
        <span about="v-wf:StartForm_canEdit" property="rdfs:label"></span>
      </label>
    </div>
    <div class="checkbox checkbox_setStatus -edit">
      <label>
        <veda-control property="v-wf:StartForm_setStatus" data-type="boolean"></veda-control>
        <span about="v-wf:StartForm_setStatus" property="rdfs:label"></span>
      </label>
    </div>
    <em about="s-wf:SimpleRouteStartForm_controller" property="rdfs:label"></em>
    <div rel="s-wf:SimpleRouteStartForm_controller" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
    <veda-control data-type="link" rel="s-wf:SimpleRouteStartForm_controller" class="-view edit -search fulltext"></veda-control>
  </div>
`;
