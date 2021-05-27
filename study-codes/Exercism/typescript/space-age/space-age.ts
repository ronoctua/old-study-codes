class SpaceAge {
  constructor(public seconds: number) {}

  private convertToEarthAge(planetYearInSeconds: number) {
    return Number((this.seconds / planetYearInSeconds).toFixed(2));
  }

  onEarth = (): number => this.convertToEarthAge(31557600);
  onMercury = (): number => this.convertToEarthAge(7600543.81992);
  onVenus = (): number => this.convertToEarthAge(19414149.052176);
  onMars = (): number => this.convertToEarthAge(59354032.69008);
  onJupiter = (): number => this.convertToEarthAge(374355659.124);
  onSaturn = (): number => this.convertToEarthAge(929292362.8848);
  onUranus = (): number => this.convertToEarthAge(2651370019.3296);
  onNeptune = (): number => this.convertToEarthAge(5200418560.032);
}

export default SpaceAge;
