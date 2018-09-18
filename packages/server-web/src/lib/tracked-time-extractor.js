module.exports = { extractTrackedTimes };

function extractTrackedTimes(inputString) {
  const regex = /#TRACK\((\{.*?\:.*?\})\)/gi;
  const matches = inputString.match(regex);
  let text = inputString;
  let trackedTimes = [];
  if (matches) {
    trackedTimes = matches.map(match => {
      text = text.replace(match, "");
      // in theory, this should be provided as capture group by the regex engine.
      // not sure why it doesn't work
      const matchGroup = match.replace("#TRACK(", "").replace(/\)$/, "");
      return JSON.parse(matchGroup);
    });
    text = text.replace(/\s+/g, " ").trim();
  }

  return { trackedTimes, text };
}
