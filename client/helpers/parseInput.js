function parseInput(input) {
  let parsed = {};

  let command = null;

  if (!input.includes(" ")) { // no arg(s). just command.
    parsed.command = input.slice(1);
    return parsed;
  }

  parsed.command = input.substring(1, input.indexOf(" "));

  if (!input.includes("@")) { // command + chat message
    parsed.message = input.slice(input.indexOf(" ") + 1);

    return parsed;
  } else { // command + receiver(s) + message
    let receivers = [];
    let iHeads = [];
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "@")
        iHeads.push(i + 1);
    }
    let iTails = [];
    for (let i = 0; i < iHeads.length; i++) {
      for (let k = iHeads[i]; k < input.length; k++) {
        if (input[k] === " ") {
          iTails.push(k);
          break;
        }
      }
    }
    for (let i = 0; i < iHeads.length; i++) {
      receivers.push(input.substring(iHeads[i], iTails[i]));
    }

    const iLastreceiver = input.lastIndexOf("@");
    const iMsg = iLastreceiver + input.slice(iLastreceiver).indexOf(" ") + 1;
    const message = input.slice(iMsg);

    parsed.receivers = receivers;
    parsed.message = message;

    return parsed;
  }
}

module.exports = parseInput;

