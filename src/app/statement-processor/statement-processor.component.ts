import { Component, OnInit, ViewChild } from "@angular/core";
import { FileUtil } from './file.util';
import { Constants } from './statement-processor.constants';
import * as $ from 'jquery';
@Component({
  selector: 'app-statement-processor',
  templateUrl: './statement-processor.component.html',
  styleUrls: ['./statement-processor.component.css']
})
export class StatementProcessorComponent implements OnInit {

  headersRow: any[];
  failedRecords: any[];
  @ViewChild('fileImportInput')
  fileImportInput: any;
  isRecordsAvailable: boolean = false;
  isFailedRecords: boolean = false;
  csvRecords = [];
  rowsPerPageList: Number[] = Constants.RowsPerPageList;
  defaultRowsPerPage: Number = Constants.DefaultRowsPerPage;

  constructor(public _fileUtil: FileUtil
  ) { }

  ngOnInit() { }

  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  fileChangeListener($event): void {
    this.isFailedRecords = false;
    this.isRecordsAvailable = false;
    let text = [];
    let target = $event.target || $event.srcElement;
    let files = target.files;
    if (Constants.validateHeaderAndRecordLengthFlag) {
      if (this._fileUtil.isCSVFile(files[0])) {
        this.parseCSVData($event);
      }
      if (this._fileUtil.isXMLFile(files[0])) {
        this.parseXMLData($event);
      }
    }
  };

  parseXMLData($event) {
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = (data) => {
      parseFile(reader.result);
    };
    //this will parse XML file and output it to website
    var parseFile = (text) => {
      var finalRecords = [];
      var xmlDoc = $.parseXML(text),
        $xml = $(xmlDoc),
        $options = $xml.find("record");
      $.each($options, function (index) {
        let record = [];
        for (var i = 0; i < $(this).children().length; i++) {
          if (index == '0') {
            if (i == 0) {
              record.push($(this)[0].attributes[i].localName);
            }
            record.push($(this).children()[i].localName)
          } else {
            if (i == 0) {
              record.push($(this)[0].attributes[i].value);
            }
            record.push($(this).children()[i].innerHTML);
          }
        }
        console.log(record);
        finalRecords.push(record);
      });
      // console.log(finalRecords)
      this.csvRecords = finalRecords;
      if (this.csvRecords == null) {
        //If control reached here it means csv file contains error, reset file.
        this.fileReset();
      } else {
        this.isRecordsAvailable = true;
        // this.findfailedRecords();
      }
    };
  }

  parseCSVData($event) {
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = (data) => {
      let csvData = reader.result;
      let csvRecordsArray = csvData.split(/\r\n|\n/);
      //console.log(csvRecordsArray)
      let headerLength = -1;
      if (Constants.isHeaderPresentFlag) {
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length;
      }
      this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray,
        headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);
      //console.log(this.csvRecords);
      if (this.csvRecords == null) {
        //If control reached here it means csv file contains error, reset file.
        this.fileReset();
      } else {
        this.isRecordsAvailable = true;
        // this.findfailedRecords();
      }
    }

    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  }

  findfailedRecords() {
    this.failedRecords = [];
    this.failedRecords.push(this.csvRecords[0]);
    let referenceNumbers = [];
    //retrieve reference numbers for each record
    this.csvRecords.forEach((record, index) => {
      referenceNumbers.push(record[0]);
    });

    //unique reference Numbers
    let occurrences = referenceNumbers.reduce(function (occ, item) {
      occ[item] = (occ[item] || 0) + 1;
      return occ;
    }, {});

    console.log(occurrences);

    //check for the end Euros correct or not
    this.csvRecords.forEach((record, index) => {
      if (!(index == 0)) {
        let endValue = parseFloat(record[3]) + parseFloat(record[4]);
        endValue = (Math.round(endValue * 100) / 100);
        if (!(endValue == parseFloat(record[5])) || occurrences[record[0]] > 1) {
          this.failedRecords.push(record);
        }
      }
    });
    this.isFailedRecords = this.failedRecords.length > 1 ? true : false;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
    this.isFailedRecords = false;
    this.isRecordsAvailable = false;
  }
}


