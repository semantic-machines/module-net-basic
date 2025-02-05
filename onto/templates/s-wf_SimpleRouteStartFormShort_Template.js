export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);
  if (individual.hasValue('s-wf:SimpleRouteStartForm_tooltip')) {
    const tooltipText = individual['s-wf:SimpleRouteStartForm_tooltip'].map(veda.Util.formatValue).join(' ');
    const tooltipTemplate = '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner aaas" style="text-align: left; white-space:break-spaces"></div></div>';
    const control = $('veda-control[rel="s-wf:SimpleRouteStartForm_participant"]', template);
    control.attr('data-tooltip', individual.tooltip);
    control.tooltip({
      title: tooltipText,
      placement: 'bottom',
      container: container,
      animation: false,
      template: tooltipTemplate,
      sanitize: false
    });
  }
  
  template.on('validate', function () {
    const result = {};
    if (individual.hasValue('s-wf:SimpleRouteStartForm_participantMinCardinality') || individual.hasValue('s-wf:SimpleRouteStartForm_participantMinCardinality')) {
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
    template[0].dispatchEvent(new CustomEvent('validated', {detail: result}));
  });

  // if (individual.tooltip != undefined) {
  //   const control = $('veda-control[rel="s-wf:SimpleRouteStartForm_participant"]', template);
  //   control.attr('data-tooltip', individual.tooltip);
  //   control.tooltip({
  //     title: individual.tooltip,
  //     placement: 'top',
  //     container: container,
  //     animation: false,
  //   });
  // }
}

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
    <em about="s-wf:SimpleRouteStartForm_deadlineDays" property="rdfs:label"></em>
    <div property="s-wf:SimpleRouteStartForm_deadlineDays" class="view -edit -search"></div>
    <veda-control data-type="integer" property="s-wf:SimpleRouteStartForm_deadlineDays" class="-view edit -search"></veda-control>
    <div class="checkbox checkbox_canEdit disabled">
      <label>
        <veda-control property="v-wf:StartForm_canEdit" data-type="boolean"></veda-control>
        <span about="v-wf:StartForm_canEdit" property="rdfs:label"></span>
      </label>
    </div>
  </div>
`;
