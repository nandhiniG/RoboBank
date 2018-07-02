import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUtil } from './file.util';
import { StatementProcessorComponent } from './statement-processor.component';

describe('StatementProcessorComponent', () => {
  let component: StatementProcessorComponent;
  let fixture: ComponentFixture<StatementProcessorComponent>;
  let csvFiles = Array<File>();
  let xmlFiles = Array<File>();
  //set sample csv files for testing
  let CSV = [
    'Reference,AccountNumber,Description,Start Balance,Mutation,End Balance',
    '194261,NL91RABO0315273637,Clothes from Jan Bakker,21.6,-41.83,-20.23',
    '112806,NL27SNSB0917829871,Clothes for Willem Dekker,91.23,+15.57,106.8'
  ].join('\n');
  let contentTypeCSV = 'text/csv';
  let dataCSV = new Blob([CSV], { type: contentTypeCSV });
  let arrayOfBlobCSV = new Array<Blob>();
  arrayOfBlobCSV.push(dataCSV);
  let csvData = new File(arrayOfBlobCSV, "Mock.csv");
  csvFiles.push(csvData);

  //set sample xml data for testing

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
  let xmlData = new File(arrayOfBlob, "Mock.xml");
  xmlFiles.push(xmlData);

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

 it('check input file type CSV or not', () => {
    expect(component._fileUtil.isCSVFile(csvFiles[0])).toBe(true);
  });

  it('check input file type XML or not', () => {
    expect(component._fileUtil.isXMLFile(xmlFiles[0])).toBe(true);
  });

  it('Process the Header Statements from csv File', () => {
    let reader = new FileReader();
    reader.readAsText(csvFiles[0]);
    reader.onload = (data) => {
      let csvData = reader.result;
      let headerLength = -1;
      let csvRecordsArray = csvData.split(/\r\n|\n/);
      
      expect(component._fileUtil.getHeaderArray(csvRecordsArray, ',')).toBeTruthy();
};
    });

    it('Process the records Statements from csv File', () => {
      let reader = new FileReader();
      reader.readAsText(csvFiles[0]);
      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = csvData.split(/\r\n|\n/);
        let headerLength = -1;
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, ',');
        headerLength = headersRow.length;
        this.csvRecords = component._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength,true,',');
       
        expect(component._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength,true,',')).toBeTruthy();
        
  };
      });
     

});
