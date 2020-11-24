/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.getNum = function (input) {
    const allowedCharacters = RegExp("[/.0-9sa-zA-Z]+");
    const invalidFraction = RegExp("[/]{2,}");
    const invalidDecimal = RegExp("[.]{2,}");
    var result;

    if (allowedCharacters.test(input)) {
      const index = input.match(/[a-zA-Z]/).index;
      if (index === 0) {
        result = 1;
        return result;
      }
      result = input.slice(0, index);

      if (invalidFraction.test(result) || invalidDecimal.test(result)) {
        return "invalid number";
      }
      if (result.includes("/")) {
        result = eval(result);
        return result;
      }
      return Number(result);
    } else {
      return "invalid number";
    }
  };

  this.getUnit = function (input) {
    const units = [
      "gal",
      "l",
      "mi",
      "km",
      "lbs",
      "kg",
      "GAL",
      "L",
      "MI",
      "KM",
      "LBS",
      "KG",
    ];
    var result;
    const index = input.match(/[a-zA-Z]/).index;
    result = input.slice(index);
    for (let i = 0; i < units.length; i++) {
      if (result === units[i]) {
        return result;
      }
    }
    return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    const arr1 = ["gal", "l", "mi", "km", "lbs", "kg"];
    const arr2 = ["l", "gal", "km", "mi", "kg", "lbs"];
    const unit = this.getUnit(initUnit).toLowerCase();
    const index = arr1.indexOf(unit);
    return arr2[index];
  };

  this.spellOutUnit = function (unit) {
    const units = ["gal", "l", "mi", "km", "lbs", "kg"];
    const spelledOutUnits = [
      "gallons",
      "liters",
      "miles",
      "kilometers",
      "pounds",
      "kilos",
    ];
    return spelledOutUnits[units.indexOf(unit)];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const metric = ["l", "km", "kg"];
    const imperial = ["gal", "mi", "lbs"];
    const unit = initUnit.toLowerCase();
    const isImperial = imperial.includes(unit) ? true : false;
    let result;
    if (isImperial) {
      switch (unit) {
        case "gal":
          result = initNum * galToL;
          break;
        case "mi":
          result = initNum * miToKm;
          break;
        case "lbs":
          result = initNum * lbsToKg;
          break;
      }
    } else {
      switch (unit) {
        case "l":
          result = initNum / galToL;
          break;
        case "km":
          result = initNum / miToKm;
          break;
        case "kg":
          result = initNum / lbsToKg;
          break;
      }
    }
    return Math.round((result + Number.EPSILON) * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    var result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum}`;
    return result;
  };
}

module.exports = ConvertHandler;
