"use strict";
describe("thermostat", function () {
  var thermostat;

  beforeEach(function () {
    thermostat = new Thermostat();
  });

  it("starts at 20C", function () {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it("can decrease the temperature with down()", function () {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it("can increase the temperature with up()", function () {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it("has a minimum of 10 degrees", function () {
    for (var i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  describe("Power Saving Mode", function () {
    it("has power saving mode as default", function () {
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it("can switch power saving mode OFF", function () {
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
    });

    it("can switch back power saving mode ON", function () {
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });
  });

  describe("When power saving mode is ON", function () {
    it("has a max temperature of 25C", function () {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });
  });

  describe("When power saving mode is OFF", function () {
    it("has a max temperature of 32C", function () {
      thermostat.switchPowerSavingModeOff();
      for (var i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    });
  });

  describe("Reset temperature", function () {
    it("resets the temperature to 20C", function () {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      thermostat.resetTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });

  describe("displaying usage levels", function () {
    describe("when temperature is below 18C", function () {
      it("is considered as low usage", function () {
        for (var i = 0; i < 4; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual("Low usage");
      });
    });

    describe("when temperature is between 18 and 25C", function () {
      it("is considered as medium usage", function () {
        expect(thermostat.energyUsage()).toEqual("Medium usage");
      });
    });

    describe("when temperature is higher than 25C", function () {
      it("is considered as high usage", function () {
        thermostat.powerSavingMode = false;
        for (var i = 0; i < 8; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual("High usage");
      });
    });
  });
});
