//Battleship in Google Sheets!
//Joe Hays 2018

var ss=SpreadsheetApp.getActiveSpreadsheet();
var sheet=ss.getActiveSheet();
var ActiveName = sheet.getSheetName();

//Triggers all other functions
function onEdit(e){
    var range = e.range;
    var col = range.getColumn();
    var row = range.getRow();
    var Active = ActiveName;
    var InActive = inactive();
    if(sheet.getRange('X7').getValue()=='reset'){
        ss.getSheetByName(Active).getRange('B2:K11').clearContent().setBackground('#FFFFFF');
        ss.getSheetByName(Active).getRange('M2:V11').clearContent().setBackground('#FFFFFF');
        ss.getSheetByName(Active).getRange('X7').clearContent().setBackground('#FFFFFF');
        ss.getSheetByName(InActive).getRange('B2:K11').clearContent().setBackground('#FFFFFF');
        ss.getSheetByName(InActive).getRange('M2:V11').clearContent().setBackground('#FFFFFF');
        ss.getSheetByName(InActive).getRange('X7').clearContent().setBackground('#FFFFFF');
    }
    if(col>1&&col<12){  
        if(row>1&&row<12){
            SpreadsheetApp.getActive().getSheetByName(Active).getRange('L1').setValue('Their Turn').setFontColor('#FFFFFF').setBackground('#FF0000');
            SpreadsheetApp.getActive().getSheetByName(InActive).getRange('L1').setValue('Your Turn').setFontColor('#000000').setBackground('#00FF00');
            var Player1Cell=getCellValue(Active,col,row);
            var Player2Cell=getCellValue(InActive,col+11,row);
            if(Player1Cell!=''){
                if(Player2Cell!=''){
                    hit(Active,range,col,row);
                    hit(InActive,range,col+11,row);
                }else{
                    miss(Active,range,col,row);
                    miss(InActive,range,col+11,row);
                }
            }else{
                miss(Active,range,col,row);
                miss(InActive,range,col+11,row);
            }
        }
    }
}

//Determines 'Active' sheet that was last edited
function inactive(){
    if(ActiveName=='Player 1'){
        return 'Player 2';
    }else{
        return 'Player 1';
    }
}

//Gets value of the cell for comparison
function getCellValue(sheetName,col,row){
    return SpreadsheetApp
        .getActive()
        .getSheetByName(sheetName)
        .getRange(row,col)
        .getValue();
}

//Sets background to Red if hit
function hit(sheetName,range,col,row){
    SpreadsheetApp
        .getActive()
        .getSheetByName(sheetName)
        .getRange(row,col)
        .setBackground('Red');
}

//Sets Background to Yellow if miss
function miss(sheetName,range,col,row){
    SpreadsheetApp
        .getActive()
        .getSheetByName(sheetName)
        .getRange(row,col)
        .setBackground('Yellow');
}