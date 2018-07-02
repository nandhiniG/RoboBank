import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUtil } from './file.util';
import { StatementProcessorComponent } from './statement-processor.component';

describe('StatementProcessorComponent', () => {
  let component: StatementProcessorComponent;
  let fixture: ComponentFixture<StatementProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatementProcessorComponent],
      providers: [FileUtil]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should consist of data', () => {
    expect(component.fileChangeListener).toBeDefined();
  });
  it('check csv file or not', () => {
    let CSV = [
      'Reference,AccountNumber,Description,Start Balance,Mutation,End Balance',
      '194261,NL91RABO0315273637,Clothes from Jan Bakker,21.6,-41.83,-20.23',
      '112806,NL27SNSB0917829871,Clothes for Willem Dekker,91.23,+15.57,106.8'
    ].join('\n');
    let contentType = 'text/csv';
    let data = new Blob([CSV], { type: contentType });
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let fileData = new File(arrayOfBlob, "Mock.csv");
    expect(component._fileUtil.isCSVFile(fileData)).toBe(true);
  });
  it('check xml file or not', () => {
    let XML = [
      '<records>                                                               ',
      '  <record reference="130498">                                           ',
      '    <accountNumber>NL69ABNA0433647324</accountNumber>                   ',
      '    <description>Tickets for Peter Theuß</description>                  ',
      '    <startBalance>26.9</startBalance>                                   ',
      '    <mutation>-18.78</mutation>                                         ',
      '    <endBalance>8.12</endBalance>                                       ',
      '  </record>                                                             ',
      '  <record reference="170148">                                           ',
      '    <accountNumber>NL43AEGO0773393871</accountNumber>                   ',
      '    <description>Flowers for Jan Theuß</description>                    ',
      '    <startBalance>16.52</startBalance>                                  ',
      '    <mutation>+43.09</mutation>                                         ',
      '    <endBalance>59.61</endBalance>                                      ',
      '  </record>                                                             ',
      '</records>                                                              '
    ].join('\n');
    let contentType = 'text/xml';
    let data = new Blob([XML], { type: contentType });
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let fileData = new File(arrayOfBlob, "Mock.xml");
    expect(component._fileUtil.isXMLFile(fileData)).toBe(true);
  });

  
});
