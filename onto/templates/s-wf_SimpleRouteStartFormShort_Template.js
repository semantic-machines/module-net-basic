import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import CommonUtil from '/js/common/util.js';

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
export const html = `
  <div>
    <div class="row row-attribute -view edit -search" id="tooltip">
      <div class="col-sm-3 col-xs-5"></div>
      <div class="col-sm-9 col-xs-7">
        <div class="alert alert-info" style="padding:10px;">
          <div about="@" property="s-wf:SimpleRouteStartForm_tooltip" class="markdown" style="white-space: pre-line; line-height: 1;"></div>
        </div>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label>
          <span about="s-wf:SimpleRouteStartForm_participant" property="rdfs:label"></span>
          <span about="@" property="v-s:description" class="view edit -search"></span>
        </label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="s-wf:SimpleRouteStartForm_participant" class="view edit -search" data-template="v-ui:LabelWithBorderTemplate"></div>
        <veda-control data-type="link" rel="s-wf:SimpleRouteStartForm_participant" class="-view edit search fulltext"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="s-wf:SimpleRouteStartForm_comment" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div property="s-wf:SimpleRouteStartForm_comment" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
        <veda-control data-type="text" rel="s-wf:SimpleRouteStartForm_comment" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="s-wf:SimpleRouteStartForm_deadlineDays" property="rdfs:label"></label>
      </div>
      <div class="col-sm-3 col-xs-3">
        <div property="s-wf:SimpleRouteStartForm_deadlineDays" class="-view -edit search"></div>
        <div about="@" property="s-wf:SimpleRouteStartForm_deadlineDays" class="view edit -search"></div>
        <veda-control data-type="integer" property="s-wf:SimpleRouteStartForm_deadlineDays" class="-view -edit -search"></veda-control>
      </div>
    </div>
    <!--div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
      </div>
      <div class="col-sm-9 col-xs-7">
        <div class="checkbox checkbox_canEdit disabled">
          <label>
            <veda-control property="v-wf:StartForm_canEdit" data-type="boolean"></veda-control>
            <span about="v-wf:StartForm_canEdit" property="rdfs:label"></span>
          </label>
        </div>
      </div>
    </div-->
  </div>
`;
