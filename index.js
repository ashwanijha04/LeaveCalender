import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import * as dataSource from './datasource.json';
export class Resource extends SampleBase {
  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.resourceSampleData, null, true);
    this.dataManger = new DataManager({
      url: 'http://localhost:54738/Home/LoadData', // Here need to mention the web api sample running path
      crudUrl: 'http://localhost:54738/Home/UpdateData',
      crossDomain: true,
      adaptor: new UrlAdaptor
    });
    this.resourceData = [
      { Text: 'Margaret', Id: 1, Color: '#ea7a57' },
      { Text: 'Robert', Id: 2, Color: '#df5286' },
      { Text: 'Laura', Id: 3, Color: '#865fcf' }
    ];
    this.dataQuery = new Query().addParams('GroupID', '1,2,3');
  }
  onChange() {
    let predicate;
    let resources = document.querySelectorAll('.checkbox-resource');
    resources.forEach(function (resource) {
      let instance = resource.querySelector('.e-checkbox').ej2_instances[0];
      if (instance && instance.checked) {
        predicate = predicate ? predicate + ',' + instance.value : instance.value;
      }
    });
    let scheduleObj = document.querySelector('.e-schedule').ej2_instances[0];
    scheduleObj.eventSettings.query = new Query().addParams('GroupID', predicate ? predicate : '');
  }
  render() {
    return (<div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent cssClass='resource' width='100%' height='650px' selectedDate={new Date(2018, 5, 5)} ref={schedule => this.scheduleObj = schedule} eventSettings={{
            dataSource: this.dataManger, query: this.dataQuery
          }}>
            <ResourcesDirective>
              <ResourceDirective field='GroupID' title='Owners' name='Owners' allowMultiple={true} dataSource={this.resourceData} textField='Text' idField='Id' colorField='Color'>
              </ResourceDirective>
            </ResourcesDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <table id="property" title="Resources" className='property-panel-table' style={{ width: '100%' }}>
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <CheckBoxComponent ref={checkboxObj => this.ownerOneObj = checkboxObj} value='1' id='margaret' cssClass='checkbox-resource' checked={true} label='Margaret' change={this.onChange.bind(this)}></CheckBoxComponent>
              </td>
            </tr>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <CheckBoxComponent ref={checkboxObj => this.ownerTwoObj = checkboxObj} value='2' id='robert' cssClass='checkbox-resource' checked={true} label='Robert' change={this.onChange.bind(this)}></CheckBoxComponent>
              </td>
            </tr>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <CheckBoxComponent ref={checkboxObj => this.ownerThreeObj = checkboxObj} value='3' id='laura' cssClass='checkbox-resource' checked={true} label='Laura' change={this.onChange.bind(this)}></CheckBoxComponent>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>);
  }
}

render(<Resource />, document.getElementById('sample'));