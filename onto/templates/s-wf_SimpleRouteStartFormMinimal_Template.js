import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);
  if (!individual.hasValue('s-wf:SimpleRouteStartForm_tooltip')) {
    $('#tooltip', template).remove();
  }
  template.on('validate', async function () {
    const result = {};
    if (individual.hasValue('s-wf:SimpleRouteStartForm_participantMinCardinality') || individual.hasValue('s-wf:SimpleRouteStartForm_participantMaxCardinality')) {
      const currentParticipants = individual.hasValue('s-wf:SimpleRouteStartForm_participant') ? individual['s-wf:SimpleRouteStartForm_participant'].length : 0;
      if (individual.hasValue('s-wf:SimpleRouteStartForm_participantMinCardinality')) {
        if (currentParticipants < individual['s-wf:SimpleRouteStartForm_participantMinCardinality'][0]) {
          result['s-wf:SimpleRouteStartForm_participant'] = {
            state: false,
            cause: ['v-ui:minCardinality'],
          };
        }
      }
      if (individual.hasValue('s-wf:SimpleRouteStartForm_participantMaxCardinality')) {
        if (currentParticipants > individual['s-wf:SimpleRouteStartForm_participantMaxCardinality'][0]) {
          result['s-wf:SimpleRouteStartForm_participant'] = {
            state: false,
            cause: ['v-ui:maxCardinality'],
          };
        }
      }
    } else {
      result['s-wf:SimpleRouteStartForm_participant'] = {
        state: true,
        cause: ['v-ui:maxCardinality'],
      };
    }
    if (individual.hasValue('s-wf:SimpleRouteStartForm_participant') && individual.hasValue('s-wf:SimpleRouteStartForm_editable',true)) {
      const participants = individual['s-wf:SimpleRouteStartForm_participant'];
      let hasDeleted = false;
      for (let i = 0; i < participants.length; i++) {
        const participant = await participants[i].load();
        if (participant.hasValue('v-s:deleted',true)) {
          hasDeleted = true;
          break;
        }
      }
      if (hasDeleted) {
        result['s-wf:SimpleRouteStartForm_participant'] = {
          state: false,
          cause: ['v-s:SelectedDeletedValuesCommentBundle'],
        };
      }
    }
    template[0].dispatchEvent(new CustomEvent('validated', {detail: result}));
  });
}

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
