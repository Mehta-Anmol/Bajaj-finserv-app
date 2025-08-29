function slugifyName(fullName) {
  return String(fullName || "john doe")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function toUserId(fullName, dobDDMMYYYY) {
  const slug = slugifyName(fullName);
  const dob = String(dobDDMMYYYY || "17091999").replace(/\D/g, "");
  return `${slug}_${dob}`;
}

function isNumericStr(s) {
  return typeof s === "string" && /^[0-9]+$/.test(s);
}

function isAlphaStr(s) {
  return typeof s === "string" && /^[a-zA-Z]+$/.test(s);
}

function reverseEachTokenAndJoin(tokens) {
  const reversedOrder = [...tokens].reverse();
  const reversedChars = reversedOrder.map((tok) =>
    tok.split("").reverse().join("")
  );
  return reversedChars.join("");
}

function alternatingCaps(s) {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    out += i % 2 === 0 ? s[i].toUpperCase() : s[i].toLowerCase();
  }
  return out;
}

function getContext() {
  const fullName = process.env.FULL_NAME || "Anmol Mehta";
  const dob = process.env.DOB_DDMMYYYY || "28012004"; // DDMMYYYY
  const email = process.env.EMAIL || "anmolmehta01121978@gmail.com";
  const roll = process.env.ROLL_NUMBER || "22BCE3151";
  return { fullName, dob, email, roll };
}

function processPayload(dataArray, ctx) {
  const evens = [];
  const odds = [];
  const alphas = [];
  const specials = [];
  let sum = 0;

  for (const raw of dataArray) {
    const v = String(raw);
    if (isNumericStr(v)) {
      const n = parseInt(v, 10);
      sum += n;
      if (n % 2 === 0) evens.push(v);
      else odds.push(v);
    } else if (isAlphaStr(v)) {
      alphas.push(v.toUpperCase());
    } else {
      specials.push(v);
    }
  }

  const concatSource = reverseEachTokenAndJoin(alphas);
  const concatString = alternatingCaps(concatSource);

  return {
    is_success: true,
    user_id: toUserId(ctx.fullName, ctx.dob),
    email: ctx.email,
    roll_number: ctx.roll,
    odd_numbers: odds,
    even_numbers: evens,
    alphabets: alphas,
    special_characters: specials,
    sum: String(sum),
    concat_string: concatString,
  };
}

module.exports = { processPayload, getContext };
