export const html = `
<li class="list-group-item">
  <div class="row">
    <div class="col-md-5">
      <em about="v-s:responsible" property="rdfs:label"></em>
      <div rel="v-s:responsible" class="view edit -search" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="link" rel="v-s:responsible" class="-view edit search fulltext"></veda-control>
    </div>
    <div class="col-md-4">
      <em about="v-s:description" property="rdfs:label"></em>
      <div property="v-s:description" class="view -edit -search"></div>
      <veda-control data-type="text" property="v-s:description" class="-view edit -search"></veda-control>
    </div>
    <div class="col-md-3">
      <em about="v-s:dateToPlan" property="rdfs:label"></em>
      <div property="v-s:dateToPlan" class="view -edit -search"></div>
      <veda-control data-type="dateTime" property="v-s:dateToPlan" class="-view edit -search"></veda-control>
    </div>
  </div>
</li>
`;
