import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (!individual.hasValue('v-wf:to')) {
    template.empty();
  }
};

export const html = `
  <div>
    <hr class="margin-sm" />
    <em about="v-s:TaskIsRedirectedFrom" property="rdfs:label"> </em>
    <span rel="v-wf:to" data-template="v-ui:LabelTemplate"></span>
    <div rel="v-wf:takenDecision">
      <div>
        <em about="rdfs:comment" property="rdfs:label"> </em>
        <span about="@" property="rdfs:comment"></span>
      </div>
    </div>
  </div>
`;
