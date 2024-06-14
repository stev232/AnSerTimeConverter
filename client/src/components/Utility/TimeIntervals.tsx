const times:string[] = ['0000', '0005', '0010', '0015', '0020', '0025', '0030', '0035', '0040', '0045', '0050', '0055', '0100', '0105', '0110', '0115', '0120', '0125', '0130',
    '0135', '0140', '0145', '0150', '0155', '0200', '0205', '0210', '0215', '0220', '0225', '0230', '0235', '0240', '0245', '0250', '0255', '0300', '0305', '0310', '0315', 
    '0320', '0325', '0330', '0335', '0340', '0345', '0350', '0355', '0400', '0405', '0410', '0415', '0420', '0425', '0430', '0435', '0440', '0445', '0450', '0455', '0500', 
    '0505', '0510', '0515', '0520', '0525', '0530', '0535', '0540', '0545', '0550', '0555', '0600', '0605', '0610', '0615', '0620', '0625', '0630', '0635', '0640', '0645', 
    '0650', '0655', '0700', '0705', '0710', '0715', '0720', '0725', '0730', '0735', '0740', '0745', '0750', '0755', '0800', '0805', '0810', '0815', '0820', '0825', '0830', 
    '0835', '0840', '0845', '0850', '0855', '0900', '0905', '0910', '0915', '0920', '0925', '0930', '0935', '0940', '0945', '0950', '0955', '1000', '1005', '1010', '1015',
    '1020', '1025', '1030', '1035', '1040', '1045', '1050', '1055', '1100', '1105', '1110', '1115', '1120', '1125', '1130', '1135', '1140', '1145', '1150', '1155', '1200',
    '1205', '1210', '1215', '1220', '1225', '1230', '1235', '1240', '1245', '1250', '1255', '1300', '1305', '1310', '1315', '1320', '1325', '1330', '1335', '1340', '1345', 
    '1350', '1355', '1400', '1405', '1410', '1415', '1420', '1425', '1430', '1435', '1440', '1445', '1450', '1455', '1500', '1505', '1510', '1515', '1520', '1525', '1530',
    '1535', '1540', '1545', '1550', '1555', '1600', '1605', '1610', '1615', '1620', '1625', '1630', '1635', '1640', '1645', '1650', '1655', '1700', '1705', '1710', '1715', 
    '1720', '1725', '1730', '1735', '1740', '1745', '1750', '1755', '1800', '1805', '1810', '1815', '1820', '1825', '1830', '1835', '1840', '1845', '1850', '1855', '1900',
    '1905', '1910', '1915', '1920', '1925', '1930', '1935', '1940', '1945', '1950', '1955', '2000', '2005', '2010', '2015', '2020', '2025', '2030', '2035', '2040', '2045', 
    '2050', '2055', '2100', '2105', '2110', '2115', '2120', '2125', '2130', '2135', '2140', '2145', '2150', '2155', '2200', '2205', '2210', '2215', '2220', '2225', '2230',
    '2235', '2240', '2245', '2250', '2255', '2300', '2305', '2310', '2315', '2320', '2325', '2330', '2335', '2340', '2345', '2350', '2355'];

export const timeSetter = (timeInterval: any, startTime: any, endTime: any):string|string[] => {
  function getData(intervalModifier:number) {
    let start = 0;
    let returnData = new Array();

    if(startTime) {
      for(let i = 0; i < times.length; i++) {
        if(`${startTime}` == times[i]) {
          start = i;
        }
      }
    }

    let loopLength = (times.length-start)/intervalModifier;

    for(let i = 0; i < loopLength; i++) {
      if(endTime) {
        if(parseInt(endTime) >= parseInt(times[i*intervalModifier+start])) {
          returnData[i] = times[i*intervalModifier+start];
        }
      } else {
        returnData[i] = times[i*intervalModifier+start];
      }
    }

    return returnData;
  }

  switch(timeInterval) {
    case '15':
      return getData(3);
    case '20':
      return getData(4);
    case '30':
      return getData(6);
    case '45':
      return getData(9);
    case '1':
      return getData(12);
    case '115':
      return getData(15);
    case '130':
      return getData(18);
    case '145':
      return getData(21);
    case '2':
      return getData(24);
    default:
      return "Invalid time interval";
  }
}

export const timeGetter = (timeInterval: any) => {
  function getData(intervalModifier:number) {
    let returnData = {data: [{value: '', label: ''}]};
    let loopLength = times.length/intervalModifier;

    for(let i = 0; i < loopLength; i++) {
      returnData.data[i] = {value: '', label: ''};
      returnData.data[i].value = times[i*intervalModifier];
      if(parseInt(times[i*intervalModifier]) >= 0 && parseInt(times[i*intervalModifier]) < 100) {
        returnData.data[i].label = '12:' + returnData.data[i].value.substring(2,4) + 'AM';
      } else if(times[i*intervalModifier].substring(0, 1) == '0') {
        returnData.data[i].value = times[i*intervalModifier].substring(1, 4);
        returnData.data[i].label = returnData.data[i].value.substring(0, 1) + ':' + returnData.data[i].value.substring(1,3) + 'AM';
      } else if(parseInt(times[i*intervalModifier]) > 1200) {
        returnData.data[i].value = times[i*intervalModifier];
        returnData.data[i].label = `${parseInt(times[i*intervalModifier])-1200}`;
        if(parseInt(returnData.data[i].label)>= 1000) {
          returnData.data[i].label = returnData.data[i].label.substring(0, 2) + ':' + returnData.data[i].label.substring(2,4) + 'PM';
        } else {
          returnData.data[i].label = returnData.data[i].label.substring(0, 1) + ':' + returnData.data[i].label.substring(1,3) + 'PM';
        }
      } else {
        returnData.data[i].value = times[i*intervalModifier];
        if(parseInt(returnData.data[i].value) == 1200) {
          returnData.data[i].label = returnData.data[i].value.substring(0, 2) + ':' + returnData.data[i].value.substring(2,4) + 'PM';
        } else {
          returnData.data[i].label = returnData.data[i].value.substring(0, 2) + ':' + returnData.data[i].value.substring(2,4) + 'AM';
        }
      }
    }

    return returnData;
  }

  switch(timeInterval) {
    case '15':
      return getData(3);
    case '20':
      return getData(4);
    case '30':
      return getData(6);
    case '45':
      return getData(9);
    case '1':
      return getData(12);
    case '115':
      return getData(15);
    case '130':
      return getData(18);
    case '145':
      return getData(21);
    case '2':
      return getData(24);
    default:
      return "Invalid time interval";
  }
}