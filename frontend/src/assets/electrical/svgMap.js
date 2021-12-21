import Resistor from './resistor.svg';
import Inductor from './inductor.svg';
import Capacitor from './capacitor.svg';
import Reactance from './reactance.svg';
import EarthGround from './earth-gnd.svg';
import ChassisGround from './chassis-gnd.svg';
import ACVoltageSource from './vac.svg';
import DCVoltageSource1 from './vdc1.svg';
import DCVoltageSource2 from './vdc2.svg';
import ACCurrentSource from './iac.svg';
import DCCurrentSource from './idc.svg';
import Voltmeter from './voltmeter.svg';
import Ammeter from './ammeter.svg';

export const svgMap = new Map([
  ['R', Resistor],
  ['L', Inductor],
  ['C', Capacitor],
  ['Z', Reactance],
  ['gnd', EarthGround],
  ['gnd2', ChassisGround],
  ['Vac', ACVoltageSource],
  ['Vdc', [DCVoltageSource1, DCVoltageSource2]],
  ['Iac', ACCurrentSource],
  ['Idc', DCCurrentSource],
  ['VProbe', Voltmeter],
  ['IProbe', Ammeter],
]);
