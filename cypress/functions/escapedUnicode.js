function encodeToUnicode(str) {
    return str.split('').map(char => {
      const code = char.charCodeAt(0).toString(16).toUpperCase();
      return "\\u" + ("0000" + code).slice(-4);
    }).join('');
  }

  module.exports = {encodeToUnicode}