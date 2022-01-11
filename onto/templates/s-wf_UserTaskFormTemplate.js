import BrowserUtil from '/js/browser/util.js';
import CommonUtil from '/js/common/util.js';
import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (individual.hasValue('v-wf:dateGiven')) {
    const label = $('.date-given', template);
    const yesterday = new Date().setHours(0, 0, 0, 1);
    const tomorrow = new Date().setHours(23, 59, 59, 999);
    const dateGiven = individual['v-wf:dateGiven'][0];
    const dateGivenYesterday = new Date(dateGiven).setHours(0, 0, 0, 1);
    const dateGivenTomorrow = new Date(dateGiven).setHours(23, 59, 59, 999);
    const dateDone = individual.hasValue('v-wf:takenDecision') && individual['v-wf:takenDecision'][0]['v-s:created'][0];
    if (individual.hasValue('v-wf:isCompleted', false)) {
      if (dateGiven < yesterday) {
        label.toggleClass('label-default label-danger');
      } else if (yesterday < dateGiven && dateGiven <= tomorrow) {
        label.toggleClass('label-default label-warning');
      } else if (tomorrow < dateGiven) {
        label.toggleClass('label-default label-success');
      }
    } else {
      if (dateGivenYesterday < dateDone && dateDone <= dateGivenTomorrow) {
        label.toggleClass('label-default label-warning');
      } else if (dateDone < dateGiven) {
        label.toggleClass('label-default label-success');
      } else if (dateGiven < dateDone) {
        label.toggleClass('label-default label-danger');
      }
    }
  }
  return individual
    .getPropertyChain('v-wf:onWorkOrder', 'v-wf:forWorkItem', 'v-wf:forNetElement')
    .then(function (forNetElementArr) {
      // is rework task
      if (forNetElementArr.length > 0 && forNetElementArr[0].id === 's-wf:cr_rework') {
        return individual
          .getPropertyChain('v-wf:onWorkOrder', 'v-wf:forWorkItem', 'v-wf:forProcess')
          .then(function (forProcessArr) {
            return forProcessArr[0].load();
          })
          .then(function (forProcess) {
            $('#stopProcess', template).click(function (e) {
              e.preventDefault();
              const warn = new IndividualModel('v-s:AreYouSure');
              warn.load().then(function (warn) {
                warn = warn['rdfs:label'].map(CommonUtil.formatValue).join(' ');
                if (confirm(warn)) {
                  forProcess['v-wf:isStopped'] = [true];
                  forProcess.save().then(function (saved) {
                    riot.route('#/' + individual['v-wf:onDocument'][0].id);
                  });
                }
              });
            });
            const startForm = forProcess.properties['v-wf:hasStartForm'];
            if (startForm) {
              return startForm[0].data;
            } else {
              // Устаревший вариант (но почему то не такой уж и устаревший)
              console.log('not found hasStartForm, use variables');
              const promises = forProcess['v-wf:inVars'].map(function (vrbl) {
                return vrbl.load();
              });
              return Promise.all(promises).then(function (variables) {
                const startFormVar = variables.filter(function (vrbl) {
                  return vrbl.hasValue('v-wf:variableName', 'startForm_id');
                });
                return startFormVar[0]['v-wf:variableValue'][0].id;
              });
            }
          })
          .then(function (startFormId) {
            if (startFormId) {
              $('#edit-StartForm', template).click(function () {
                BrowserUtil.showModal(new IndividualModel(startFormId), new IndividualModel('s-wf:ComplexRouteStartForm_Common_Template'), 'view');
              });
            }
            return true;
          });
      } else {
        $('#edit-StartForm', template).remove();
        $('#stopProcess', template).remove();
      }
      return true;
    })
    .catch(function (error) {
      $('#edit-StartForm', template).remove();
      $('#stopProcess', template).remove();
      console.log('Unexpected behaviour', error);
    });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const document = individual.hasValue('v-wf:onDocument') && individual['v-wf:onDocument'][0];
  const taskRights = individual.rights;
  const documentRights = document && document.rights;

  $('#decisionRedirect', template).click(function () {
    const decisionClass = new IndividualModel('v-wf:DecisionRedirect');
    const decision = new IndividualModel();
    new IndividualModel('v-wf:DecisionDelegated_Bundle').load().then(function (delegatedBundle) {
      decision['rdf:type'] = [decisionClass];
      decision['v-s:backwardTarget'] = [individual];
      decision['rdfs:label'] = delegatedBundle['rdfs:label'];
      decision['v-s:backwardProperty'] = [new IndividualModel('v-wf:takenDecision')];
      decision['v-s:canRead'] = [true];
      const modal = BrowserUtil.showModal(decision, undefined, 'edit');
      decision.one('afterReset', function () {
        modal.modal('hide').remove();
      });
      decision.one('afterSave', function () {
        modal.modal('hide').remove();
      });
    });
  });

  function completedHandler () {
    if (individual.hasValue('v-wf:isCompleted', true) || individual.hasValue('v-wf:takenDecision')) {
      $('.possible-decisions, .new-decision', template).remove();
    }
  }
  individual.on('v-wf:isCompleted', completedHandler);
  individual.on('v-wf:takenDecision', completedHandler);
  template.one('remove', function () {
    individual.off('v-wf:isCompleted', completedHandler);
    individual.off('v-wf:takenDecision', completedHandler);
  });

  return Promise.all([taskRights, documentRights]).then(function (rights) {
    const taskRights = rights[0];
    const canReadDocument = rights[1] && rights[1].hasValue('v-s:canRead', true);
    if (document && !canReadDocument) {
      $('#NotRightsAlert', template).removeClass('hidden');
    }
    if (individual.hasValue('v-wf:takenDecision') || !taskRights.hasValue('v-s:canUpdate', true)) {
      $('.possible-decisions, .new-decision', template).remove();
    } else {
      $('.possible-decisions input', template).on('change', function (e) {
        const input = $(this);
        const decisionContainer = $('.new-decision', template);
        const decisionClassId = input.closest('[resource]').attr('resource');
        const decisionClass = new IndividualModel(decisionClassId);
        decision['rdf:type'] = [decisionClass];
        decision.properties['rdfs:label'] = decisionClass.properties['rdfs:label'];
        if (decisionClassId === 'v-wf:DecisionDeclined' && document && !canReadDocument) {
          const comment = new IndividualModel('v-s:NotRightsForDocumentCommentBundle');
          comment.load().then(function (comment) {
            decision['rdfs:comment'] = comment['rdfs:label'];
          });
        } else {
          const prevComment = $("veda-control[property='rdfs:comment'] textarea", decisionContainer).val();
          if (prevComment) {
            decision['rdfs:comment'] = [prevComment];
          }
        }
        decisionContainer.empty();
        decision.present(decisionContainer, undefined, 'edit');
      });

      const decision = new IndividualModel();
      decision['v-s:backwardTarget'] = [individual];
      decision['v-s:backwardProperty'] = [new IndividualModel('v-wf:takenDecision')];
      decision['v-s:canRead'] = [true];
      $('.possible-decisions input', template).first().prop('checked', 'checked').change();
    }
  });
};

export const html = `
  <div>
    <div class="container sheet">
      <style scoped>
        .taken-decision:empty {
          display: none;
        }
      </style>
      <div class="row">
        <div class="col-sm-7 col-md-9" style="border-right: 1px dotted #ccc;">
          <h2>
            <span about="@" property="rdfs:label"></span><br />
            <small about="@" property="v-s:description"></small>
          </h2>

          <div class="possible-decisions clearfix" style="position:relative">
            <hr />
            <div id="NotRightsAlert" class="alert alert-warning hidden" role="alert">
              <span about="v-s:NotRightsForDocumentBundle" property="rdfs:label"></span>
            </div>
            <h4 about="v-wf:takenDecision" property="rdfs:label"></h4>
            <div about="@" rel="v-wf:possibleDecisionClass">
              <div class="radio">
                <label>
                  <input type="radio" name="decisionRadios" />
                  <span property="rdfs:label"></span>
                </label>
              </div>
            </div>
            <div class="margin-sm">
              <button
                type="button"
                class="btn btn-default view -edit -search"
                id="decisionRedirect"
                about="v-wf:DecisionDelegate_Bundle"
                property="rdfs:label"></button>
              <button
                type="button"
                class="btn btn-primary view -edit -search"
                id="edit-StartForm"
                about="s-wf:UserTaskForm_StartForm_Bundle"
                property="rdfs:label"></button>
              <button type="button" class="btn btn-danger view -edit -search" id="stopProcess" about="v-wf:DecisionBreak" property="rdfs:label"></button>
              <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="task"></span>
            </div>
          </div>
          <div class="well new-decision"></div>
          <div class="alert alert-danger hidden" id="show-OverloadNotification">
            <h4>Внимание</h4>
            <span about="v-s:OverloadNotificationMessage" property="rdfs:label"></span>
          </div>
          <div class="well taken-decision" about="@" rel="v-wf:takenDecision"></div>
        </div>
        <div class="col-sm-5 col-md-3">
          <h3><span about="@" property="v-wf:dateGiven" class="date-given label label-default"></span></h3>
          <em about="v-wf:from" property="rdfs:label"></em>
          <div about="@" rel="v-wf:from" data-template="v-ui:LabelTemplate"></div>
          <em about="v-wf:to" property="rdfs:label"></em>
          <div about="@" rel="v-wf:to" data-template="v-ui:LabelTemplate"></div>
          <div about="@" rel="v-wf:redirect_from_task" data-template="s-wf:UserTaskFormTemplate_RedirectInfo"></div>
        </div>
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-ft:TaskRelatedTasksTemplate"></div>
    <div about="@" rel="v-wf:onDocument" class="view edit -search"></div>
  </div>
`;
