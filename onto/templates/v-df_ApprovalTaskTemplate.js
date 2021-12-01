export const html = `
<div class="container sheet">
  <h3><span about="v-df:ApprovalTask" property="rdfs:label"></span>: <span about="@" property="rdfs:label"></span></h3>
  <br>
  <div class="row">
    <div class="col-md-3">
      <em about="v-wf:from" property="rdfs:label"></em>
    </div>
    <div class="col-md-3">
      <div rel="v-wf:from" data-template="v-ui:LabelTemplate" class="view -edit -search"></div>
      <veda-control rel="v-wf:from" data-type="link" class="-view edit search fulltext"></veda-control>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3">
      <em about="v-wf:onDocument" property="rdfs:label"></em>
    </div>
    <div class="col-md-3">
      <div rel="v-wf:onDocument" data-template="v-ui:LabelTemplate" class="view -edit -search"></div>
      <veda-control rel="v-wf:onDocument" data-type="link" class="-view edit search fulltext"></veda-control>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3">
      <em about="v-wf:dateGiven" property="rdfs:label"></em>
    </div>
    <div class="col-md-3">
      <div property="v-wf:dateGiven" class="view -edit -search"></div>
      <veda-control property="v-wf:dateGiven" data-type="dateTime" class="-view edit search fulltext"></veda-control>
    </div>
  </div>
  <hr class="margin-sm">

  <div class="row">
    <div class="col-md-3">
      <em about="v-df:approvalTask_decisionKind" property="rdfs:label"></em>
    </div>
    <div class="col-md-3">
      <veda-control property="v-df:approvalTask_decisionKind" data-type="radio"></veda-control>
    </div>
  </div>

  <div class="row">
    <div class="col-md-3">
      <em about="v-wf:possibleDecisionClass" property="rdfs:label"></em>
    </div>
    <div class="col-md-3">
      <veda-control rel="v-wf:possibleDecisionClass" data-type="radio"></veda-control>
    </div>
  </div>
  <br><br>
  <div class="actions">
    <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete"></span>
  </div>
</div>
`;