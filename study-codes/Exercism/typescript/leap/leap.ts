function isLeapYear(targetYear: number): boolean {
  if (targetYear % 4 === 0 && targetYear % 100 !== 0) {
    return true;
  } else if (targetYear % 400 === 0) {
    return true;
  }

  return false;
}

export default isLeapYear;
