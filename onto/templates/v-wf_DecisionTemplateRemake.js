import $ from 'jquery';

export const pre = async function (individual, template, container, mode, extra) {
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
  if (individual['rdf:type'][0].id == 'v-wf:DecisionAchieved') {
    const dateGiven = await individual.getPropertyChain('v-s:backwardTarget', 'v-wf:dateGiven');
    console.log(dateGiven);
    if (dateGiven.length > 0 && dateGiven[0] < new Date()) {
      template.on('validate', function () {
        const result = {};
        result['rdfs:comment'] = {
          state: individual.hasValue('rdfs:comment'),
          cause: ['v-ui:minCardinality'],
        };
        template[0].dispatchEvent(new CustomEvent('validated', {detail: result}));
      });  
    }
    
  }
  console.log(individual['rdf:type'][0].id);
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
    <em about="v-wf:DecisionRemakeComment_Bundle" property="rdfs:label" class="-view edit search"></em>
    <div property="rdfs:comment" class="view -edit -search"></div>
    <veda-control property="rdfs:comment" data-type="text" class="-view edit search"></veda-control>
    <br class="-view edit -search" />
    <div class="actions -view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send cancel"></span>
    </div>
  </div>
`;
