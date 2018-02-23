function getBoxShadowWidths(boxShadow) {
  // no supporting multiple box shadow declarations for now
  if ((boxShadow.match(/(rgb|#)/g) || []).length > 1) {
    return false;
  }

  const regEx = /(\d(?=(px|\s)))/g;
  const matches = [];

  // box-shadow can have anywhere from 2-4 values, including horizontal offset, vertical offset,
  // blur, and spread. Below finds each one and pushes it into an array (regEx.exec when used in succession
  // with a global regex will find each match.
  let match = regEx.exec(boxShadow);
  while (match != null) {
    matches.push(match[0]);
    match = regEx.exec(boxShadow);
  }

  // default blur & spread to zero px if not found by the regex
  const [hOffset = 0, vOffset = 0, blur = 0, spread = 0] = matches.map(
    parseFloat
  );

  // calculate approximate widths by the distance taken up by each side of the box shadow after normalizing
  // the offsets with the spread and accounting for the added distance resulting from the blur
  // See https://msdn.microsoft.com/en-us/hh867550.aspx - "the blurring effect should approximate the
  // Gaussian blur with a standard deviation equal to HALF of the blur radius"
  const top = spread - vOffset + 0.5 * blur;
  const right = spread + hOffset + 0.5 * blur;
  const bottom = spread + vOffset + 0.5 * blur;
  const left = spread - hOffset + 0.5 * blur;

  return { top, right, bottom, left };
}
